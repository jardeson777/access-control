import {
  Controller,
  Post,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Permition } from '../../shared/decorators/permition.decorator';
import { AuthorizationService } from '../authorization/authorization.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
    private readonly authorizationService: AuthorizationService,
  ) {
    //
  }

  @Post()
  @Permition({ resources: 'all', action: 'all' })
  async create(@Body() createUserDto: CreateUserDto) {
    const userWasCreated = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (userWasCreated) throw new ConflictException('User already exists');

    const roleExists = await this.authorizationService.getByKey(
      createUserDto.role,
    );

    if (!roleExists) throw new NotFoundException('Role not found');

    const userCreated = await this.usersService.create(createUserDto);

    const userCreatedInPermit = await this.authorizationService.createUser({
      email: userCreated.email,
      key: userCreated.email,
      first_name: userCreated.name,
    });

    await this.authorizationService.userAssignRole({
      roleKey: createUserDto.role,
      userKey: userCreatedInPermit.email,
    });

    return {
      message: 'User created',
      id: userCreated.id,
    };
  }
}
