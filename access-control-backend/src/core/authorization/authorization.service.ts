import { Injectable } from '@nestjs/common';
import { ResourceInput } from './dtos/resource.dto';
import { ConfigService } from '@nestjs/config';
import { PermitIo } from './permit-io';
import { Permit } from 'permitio';
import { RoleInput } from './dtos/role.dto';
import { UserInput } from './dtos/user.dto';
import { UserAssignRoleInput } from './dtos/user-assign-role.dto';

@Injectable()
export class AuthorizationService {
  private permit: Permit;

  constructor(private readonly config: ConfigService) {
    const tokenPermitIo = this.config.get<string>('API_KEY_PERMIT_IO');
    const pdpPermitIo = this.config.get<string>('PDP_PERMIT_IO');
    this.permit = PermitIo.getInstance({
      token: tokenPermitIo,
      pdp: pdpPermitIo,
    });
  }

  async createResource(resourceInput: ResourceInput) {
    console.log('resourceInput', resourceInput);

    return await this.permit.api.resources.create({
      key: resourceInput.key,
      name: resourceInput.name,
      actions: {
        create: {},
        read: {},
        update: {},
        delete: {},
      },
    });
  }

  async listResources() {
    return await this.permit.api.resources.list();
  }

  async createRole(roleInput: RoleInput) {
    return await this.permit.api.roles.create({
      key: roleInput.key,
      name: roleInput.name,
      permissions: roleInput.permissions.map(
        (permission) => `${permission.resources}:${permission.action}`,
      ),
    });
  }

  async listRoles() {
    return await this.permit.api.roles.list();
  }

  async createUser(userInput: UserInput) {
    return await this.permit.api.users.create({
      key: userInput.key,
      first_name: userInput.first_name,
      email: userInput.email,
    });
  }

  async userAssignRole(input: UserAssignRoleInput) {
    return await this.permit.api.users.assignRole({
      user: input.userKey,
      role: input.roleKey,
      tenant: 'default',
    });
  }
}
