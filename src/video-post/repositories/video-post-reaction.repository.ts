import {
  EntityData,
  EntityManager,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  RequiredEntityData,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { VideoPostReaction } from '../entities';

@Injectable()
export class VideoPostReactionRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(VideoPostReaction)
    private readonly repository: EntityRepository<VideoPostReaction>,
  ) {
    this.em = this.repository.getEntityManager();
  }

  async create(data: RequiredEntityData<VideoPostReaction>) {
    const entity = this.repository.create(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async find(
    filter?: FilterQuery<VideoPostReaction>,
    options?: FindOptions<VideoPostReaction>,
  ) {
    return this.repository.find(filter, options);
  }

  async findOne(
    filter?: FilterQuery<VideoPostReaction>,
    options?: FindOneOptions<VideoPostReaction>,
  ) {
    return this.repository.findOne(filter, options);
  }

  async updateReaction(
    entity: VideoPostReaction,
    data: EntityData<VideoPostReaction>,
  ) {
    wrap(entity).assign(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async remove(entity: VideoPostReaction) {
    return this.em.removeAndFlush(entity);
  }
}
