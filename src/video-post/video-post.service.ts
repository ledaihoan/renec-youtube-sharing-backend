import { Injectable } from '@nestjs/common';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import * as _ from 'lodash';
import {
  VideoPostReactionRepository,
  VideoPostRepository,
} from './repositories';
import { VideoPost } from './entities';
import { SearchVideoPostDto } from './dtos';
import { CursorPaginationQuery } from '../utils/cursor-pagination-query';
import {
  buildPaginatedResponse,
  parsePaginationCursor,
} from '../utils/pagination-utils';
import { PaginationByCreatedAtParams } from './types/pagination-params';
import { PaginatedResponse } from './types/paginated-response';
import { FormattedVideoPost } from './types/formatted-video-post';
import { VIDEO_REACTIONS } from './constants';
import { UserRepository } from '../user/repositories';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly repository: VideoPostRepository,
    private readonly reactionRepository: VideoPostReactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createVideoPost(
    dto: RequiredEntityData<VideoPost>,
  ): Promise<VideoPost> {
    return this.repository.create(dto);
  }

  async searchVideoPosts(
    dto: SearchVideoPostDto,
    paginationQuery: CursorPaginationQuery,
  ): Promise<PaginatedResponse<FormattedVideoPost>> {
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
    const videoPostIds = _.map(videoPosts, 'id');
    const uploaderUserIds = _.map(videoPosts, 'userId');
    const [videoPostReactions, uploaderProfiles] = await Promise.all([
      this.reactionRepository.find({
        videoId: { $in: videoPostIds },
      }),
      this.userRepository.find({
        id: { $in: uploaderUserIds },
      }),
    ]);
    const transformedVideoPosts = _.map(videoPosts, (videoPost) => ({
      id: videoPost.id,
      title: videoPost.title,
      description: videoPost.description,
      url: videoPost.url,
      upvoteCount: _.filter(
        videoPostReactions,
        (reaction) =>
          reaction.type === VIDEO_REACTIONS.UPVOTE &&
          reaction.videoId === videoPost.id,
      ).length,
      downVoteCount: _.filter(
        videoPostReactions,
        (reaction) =>
          reaction.type === VIDEO_REACTIONS.DOWN_VOTE &&
          reaction.videoId === videoPost.id,
      ).length,
      sharedBy: _.get(
        _.find(uploaderProfiles, ['id', videoPost.userId]),
        'email',
      ),
      createdAt: videoPost.createdAt,
    }));
    return buildPaginatedResponse(transformedVideoPosts, 'createdAt', limit);
  }
}
