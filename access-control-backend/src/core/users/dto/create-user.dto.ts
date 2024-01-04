import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { RoleEnum } from '../../authorization/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
