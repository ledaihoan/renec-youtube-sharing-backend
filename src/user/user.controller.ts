import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.service.getUserById(id);
  }
}
