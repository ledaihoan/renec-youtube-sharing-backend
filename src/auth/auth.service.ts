import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePasswords } from '../utils/auth-utils';
import { User } from '../user/entities';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const { email, password } = dto;
    const user = await this.userService.getUserByEmail(email);
    if (!_.isEmpty(user)) {
      const isValidPassword = await comparePasswords(password, user.password);
      if (isValidPassword) {
        return this.generateToken(user);
      }
    }

    throw new BadRequestException('Invalid login');
  }

  async generateToken(user: User): Promise<string> {
    const payload = _.pick(user, ['id']);

    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
