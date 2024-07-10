import { Injectable } from '@nestjs/common';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import * as _ from 'lodash';
import { VideoPostReactionRepository } from './repositories';
import { VideoPostReaction } from './entities';
import { SearchVideoPostReactionDto } from './dtos/search-video-post-reaction.dto';

@Injectable()
export class VideoPostReactionService {
  constructor(private readonly repository: VideoPostReactionRepository) {}

  async addVideoReaction(
    dto: RequiredEntityData<VideoPostReaction>,
  ): Promise<VideoPostReaction> {
    const existing = await this.repository.findOne({
      userId: dto.userId,
      videoId: dto.videoId,
    });
    return _.isEmpty(existing)
      ? this.repository.create(dto)
      : this.repository.updateReaction(existing, { type: dto.type });
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
      await this.repository.remove(reaction);
    }
  }
}
