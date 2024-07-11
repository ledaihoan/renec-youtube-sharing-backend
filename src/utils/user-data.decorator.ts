import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    return request.user;
  },
);

export type UserData = { id: string };
