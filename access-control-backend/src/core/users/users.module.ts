import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../shared/database/prisma.service';
import { PasswordService } from '../authentication/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordService],
  imports: [],
})
export class UsersModule {
  //
}
