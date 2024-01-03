import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    //
  }

  @Post()
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
