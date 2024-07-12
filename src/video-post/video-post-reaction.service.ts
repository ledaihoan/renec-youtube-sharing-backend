import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import * as _ from 'lodash';
import { VideoPostReactionRepository } from './repositories';
import { VideoPostReaction } from './entities';
import { SearchVideoPostReactionDto } from './dtos';
import { VideoPostReactionEvent } from './types/video-post-reaction-event';

@Injectable()
export class VideoPostReactionService {
  private logger = new Logger(VideoPostReactionService.name);

  constructor(private readonly repository: VideoPostReactionRepository) {}

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
    } else if (existing.type !== dto.type) {
      const decreaseReactionEvent = _.cloneDeep(increaseReactionEvent);
      decreaseReactionEvent.type = existing.type;
      await this.repository.updateReaction(existing, { type: dto.type });
      this.logger.log(
        `Changing reaction ${JSON.stringify(increaseReactionEvent)}`,
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

  async searchUserReactions(userId: string, dto: SearchVideoPostReactionDto) {
    const searchDto: FilterQuery<VideoPostReaction> = { userId };
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
    }
  }
}
