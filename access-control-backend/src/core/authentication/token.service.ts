import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dtos/token.dto';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    //
  }

  generateToken(payload: JwtPayload): TokensDto {
    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  generateAccessToken(payload: JwtPayload): string {
    const secret = this.configService.get('JWT_ACCESS_SECRET');
    return this.jwtService.sign(payload, {
      secret,
    });
  }

  async validateAccessToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
