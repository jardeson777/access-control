import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { Permition } from '../../shared/decorators/permition.decorator';
import { UserInput } from './dtos/user.dto';
import { ResourceInput } from './dtos/resource.dto';
import { RoleInput } from './dtos/role.dto';
import { UserAssignRoleInput } from './dtos/user-assign-role.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {
    //
  }

  @Post('resources')
  @Permition({ resources: 'all', action: 'all' })
  async createResource(@Body() input: ResourceInput) {
    return await this.authorizationService.createResource(input);
  }

  @Get('resources')
  @Permition({ resources: 'all', action: 'all' })
  async listResources() {
    return await this.authorizationService.listResources();
  }

  @Post('roles')
  @Permition({ resources: 'all', action: 'all' })
  async createRole(@Body() input: RoleInput) {
    return await this.authorizationService.createRole(input);
  }

  @Get('roles')
  @Permition({ resources: 'all', action: 'all' })
  async listRoles() {
    return await this.authorizationService.listRoles();
  }

  @Post('users')
  @Permition({ resources: 'all', action: 'all' })
  async createUser(@Body() input: UserInput) {
    return await this.authorizationService.createUser(input);
  }

  @Post('users/assign-role')
  @Permition({ resources: 'all', action: 'all' })
  async assignRole(@Body() input: UserAssignRoleInput) {
    return await this.authorizationService.userAssignRole(input);
  }
}
