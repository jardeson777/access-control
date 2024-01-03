import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Permition } from '../../shared/decorators/permition.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {
    //
  }

  @Post()
  @Permition({ resources: 'user', action: 'create' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.usersService.create(createUserDto);

      return {
        message: 'User created',
        id: userCreated.id,
      };
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }
}
