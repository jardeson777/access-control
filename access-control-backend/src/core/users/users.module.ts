import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../shared/database/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { AuthorizationService } from '../authorization/authorization.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    PasswordService,
    AuthorizationService,
  ],
  imports: [],
})
export class UsersModule {
  //
}
