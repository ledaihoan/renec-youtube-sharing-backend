import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import * as _ from 'lodash';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VideoPostReactionRepository } from './repositories';
import { VideoPostReaction } from './entities';
import { SearchVideoPostReactionDto } from './dtos/search-video-post-reaction.dto';
import { QUEUE_NAMES } from './constants';
import {
  VIDEO_POST_REACTION_EVENT_TYPES,
  VideoPostReactionEvent,
} from './types/video-post-reaction-event';

@Injectable()
export class VideoPostReactionService {
  private logger = new Logger(VideoPostReactionService.name);

  constructor(
    private readonly repository: VideoPostReactionRepository,
    @InjectQueue(QUEUE_NAMES.VIDEO_POST_REACTION)
    private videoPostReactionQueue: Queue,
  ) {}

  async addVideoReaction(dto: RequiredEntityData<VideoPostReaction>) {
    const existing = await this.repository.findOne({
      userId: dto.userId,
      videoId: dto.videoId,
    });

    const increaseReactionEvent: VideoPostReactionEvent = {
      videoId: dto.videoId,
      userId: dto.userId,
      type: dto.type,
    };
    if (_.isEmpty(existing)) {
      await this.repository.create(dto);
      this.logger.log(
        `adding reaction ${JSON.stringify(increaseReactionEvent)}`,
      );
      this.videoPostReactionQueue.add(
        VIDEO_POST_REACTION_EVENT_TYPES.INCREASE,
        increaseReactionEvent,
      );
    } else if (existing.type !== dto.type) {
      const decreaseReactionEvent = _.cloneDeep(increaseReactionEvent);
      decreaseReactionEvent.type = existing.type;
      await this.repository.updateReaction(existing, { type: dto.type });
      this.logger.log(
        `Changing reaction ${JSON.stringify(increaseReactionEvent)}`,
      );
      this.videoPostReactionQueue.add(
        VIDEO_POST_REACTION_EVENT_TYPES.DECREASE,
        decreaseReactionEvent,
      );
      this.videoPostReactionQueue.add(
        VIDEO_POST_REACTION_EVENT_TYPES.INCREASE,
        increaseReactionEvent,
      );
    }
  }

  async searchVideoPostReactions(
    dto: SearchVideoPostReactionDto,
  ): Promise<VideoPostReaction[]> {
    const searchDto: FilterQuery<VideoPostReaction> = {};
    if (dto.videoIds) {
      _.assign(searchDto, { videoId: { $in: dto.videoIds } });
    }
    if (dto.types) {
      _.assign(searchDto, { type: { $in: dto.videoIds } });
    }
    return this.repository.find(searchDto);
  }

  async removeVideoReaction(userId: string, videoId: string) {
    const reaction = await this.repository.findOne({ userId, videoId });
    if (reaction) {
      const decreaseReactionEvent: VideoPostReactionEvent = {
        videoId: reaction.videoId,
        userId,
        type: reaction.type,
      };
      await this.repository.remove(reaction);
      this.videoPostReactionQueue.add(
        VIDEO_POST_REACTION_EVENT_TYPES.DECREASE,
        decreaseReactionEvent,
      );
    }
  }
}
