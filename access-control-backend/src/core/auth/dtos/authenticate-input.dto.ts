import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticateInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
