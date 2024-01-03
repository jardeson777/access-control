import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateInput } from './dtos/authenticate-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() authenticateInput: AuthenticateInput) {
    return this.authService.authenticate(
      authenticateInput.email,
      authenticateInput.password,
    );
  }
}
