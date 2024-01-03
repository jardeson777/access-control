import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    if (ctx.switchToHttp().getRequest().user) {
      return ctx.switchToHttp().getRequest().user;
    }
    throw new UnauthorizedException();
  },
);
