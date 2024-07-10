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

import { VideoPost } from '../entities';

@Injectable()
export class VideoPostRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(VideoPost)
    private readonly repository: EntityRepository<VideoPost>,
  ) {
    this.em = this.repository.getEntityManager();
  }

  async create(data: RequiredEntityData<VideoPost>) {
    const entity = this.repository.create(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async find(
    filter?: FilterQuery<VideoPost>,
    options?: FindOptions<VideoPost>,
  ) {
    return this.repository.find(filter, options);
  }

  async findOne(
    filter?: FilterQuery<VideoPost>,
    options?: FindOneOptions<VideoPost>,
  ) {
    return this.repository.findOne(filter, options);
  }

  async update(entity: VideoPost, updateData: EntityData<VideoPost>) {
    wrap(entity).assign(updateData);
    await this.em.persistAndFlush(entity);
    return entity;
  }
}
