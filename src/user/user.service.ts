import { Inject, Injectable } from '@nestjs/common';
import { RequiredEntityData } from '@mikro-orm/core';
import { Cache } from 'cache-manager';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(dto: RequiredEntityData<User>): Promise<User> {
    return this.repository.create(dto);
  }

  async getUserById(id: string): Promise<Partial<User>> {
    return this.repository.findOne({ id });
  }

  async checkUserId(id: string): Promise<User> {
    let user = await this.cacheManager.get(`user_${id}`);
    if (!user) {
      user = this.repository.getOne(id);
      await this.cacheManager.set(`user_${id}`, user, 300 * 1000);
    }
    return user as User;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
