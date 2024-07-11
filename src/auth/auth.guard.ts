import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AUTH_MODULE_OPTION, AuthModuleOption } from './auth-module-option';
import { IS_PUBLIC_KEY } from '../utils/public.decorator';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector,
    @Inject(AUTH_MODULE_OPTION) private readonly options: AuthModuleOption,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request as Request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.options.authSecret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const id = payload.id as string;
      const user = await this.userService.checkUserId(id);
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
