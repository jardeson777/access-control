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
    const userWasCreated = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (userWasCreated) throw new ConflictException('User already exists');

    const userCreated = await this.usersService.create(createUserDto);

    return {
      message: 'User created',
      id: userCreated.id,
    };
  }
}
