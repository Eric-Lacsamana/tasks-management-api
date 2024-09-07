import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body()
    body: RegisterDto,
  ) {
    this.logger.log('Registering user', 'AuthService');
    try {
      return await this.authService.register({
        email: body.email,
        username: body.username,
        password: body.password,
        name: body.name,
      });
    } catch (error) {
      this.logger.error('Registration failed', error.stack, 'AuthService');
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  // @Post('forgot-password')
  // async forgotPassword(@Body() body: { username: string }) {
  //   return this.authService.forgotPassword(body.username);
  // }

  // @Post('reset-password')
  // async resetPassword(@Body() body: { token: string; newPassword: string }) {
  //   return this.authService.resetPassword(body.token, body.newPassword);
  // }
}
