import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dtos';
import { User } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async registerUser(dto: RegisterUserDto): Promise<User> {
    return this.repository.create(dto);
  }

  async getUserById(id: string): Promise<Partial<User>> {
    return this.repository.findOne({ id });
  }
}
