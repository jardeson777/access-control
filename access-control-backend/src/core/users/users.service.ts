import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../shared/database/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { ConfigService } from '@nestjs/config';
// import { PermitIo } from '../../shared/permission/permit-io';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly config: ConfigService,
  ) {
    //
  }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await this.passwordService.hashPassword(
          createUserDto.password,
        ),
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
