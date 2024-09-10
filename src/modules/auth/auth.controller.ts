import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);

    if (response.status !== 200) {
      return {
        statusCode: response.status,
        message: response.message,
      };
    }

    return {
      statusCode: 200,
      data: response.data,
      message: response.message,
    };
  }
}
