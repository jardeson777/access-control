import { IsNotEmpty, IsString } from 'class-validator';

export class UserAssignRoleInput {
  @IsString()
  @IsNotEmpty()
  userKey: string;

  @IsString()
  @IsNotEmpty()
  roleKey: string;
}
