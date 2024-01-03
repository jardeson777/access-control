import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../core/auth/token.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { PermitIo } from '../permission/permit-io';
import {
  HAVE_PERMITION_KEY,
  PermitionType,
} from '../decorators/permition.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    private readonly config: ConfigService,
  ) {
    //
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) throw new UnauthorizedException();

      const permition = this.reflector.getAllAndOverride<PermitionType>(
        HAVE_PERMITION_KEY,
        [context.getHandler(), context.getClass()],
      );
      const payload = await this.tokenService.validateAccessToken(token);
      const tokenPermitIo = this.config.get<string>('API_KEY_PERMIT_IO');
      const pdpPermitIo = this.config.get<string>('PDP_PERMIT_IO');
      const permit = PermitIo.getInstance({
        token: tokenPermitIo,
        pdp: pdpPermitIo,
      });
      const userHasPermission = await permit.check(
        payload.email,
        permition.action,
        permition.resources,
      );
      if (!userHasPermission) throw new UnauthorizedException();

      request['user'] = payload;
      return userHasPermission;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
