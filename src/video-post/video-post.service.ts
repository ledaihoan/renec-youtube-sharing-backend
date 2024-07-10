import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import { VideoPostRepository } from './repositories';
import { VideoPost } from './entities';
import { SearchVideoPostDto } from './dtos/search-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(private readonly repository: VideoPostRepository) {}

  async createVideoPost(
    dto: RequiredEntityData<VideoPost>,
  ): Promise<VideoPost> {
    return this.repository.create(dto);
  }

  async searchVideoPosts(dto: SearchVideoPostDto): Promise<VideoPost[]> {
    const searchDto: FilterQuery<VideoPost> = {};
    if (dto.sourceIds) {
      _.assign(searchDto, { sourceId: { $in: dto.sourceIds } });
    }
    return this.repository.find(searchDto);
  }
}
