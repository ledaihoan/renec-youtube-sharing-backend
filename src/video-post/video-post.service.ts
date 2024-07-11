import { Injectable } from '@nestjs/common';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import { VideoPostRepository } from './repositories';
import { VideoPost } from './entities';
import { SearchVideoPostDto } from './dtos';
import { CursorPaginationQuery } from '../utils/cursor-pagination-query';
import {
  buildPaginatedResponse,
  parsePaginationCursor,
} from '../utils/pagination-utils';
import { PaginationByCreatedAtParams } from './types/pagination-params';
import { PaginatedResponse } from './types/paginated-response';

@Injectable()
export class VideoPostService {
  constructor(private readonly repository: VideoPostRepository) {}

  async createVideoPost(
    dto: RequiredEntityData<VideoPost>,
  ): Promise<VideoPost> {
    return this.repository.create(dto);
  }

  async searchVideoPosts(
    dto: SearchVideoPostDto,
    paginationQuery: CursorPaginationQuery,
  ): Promise<PaginatedResponse<VideoPost>> {
    const { cursor, limit } = paginationQuery;
    const paginationData =
      parsePaginationCursor<PaginationByCreatedAtParams>(cursor);
    const lastCreatedAt = paginationData.createdAt || new Date().toISOString();

    const searchDto: FilterQuery<VideoPost> = {
      createdAt: { $lte: lastCreatedAt },
    };
    const videoPosts = await this.repository.find(searchDto, {
      limit: limit + 1,
      orderBy: { createdAt: 'desc' },
    });
    return buildPaginatedResponse(videoPosts, 'createdAt', limit);
  }
}
