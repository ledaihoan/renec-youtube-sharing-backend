import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.repository.create(dto);
  }

  async getUserById(id: string): Promise<Partial<User>> {
    return this.repository.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
