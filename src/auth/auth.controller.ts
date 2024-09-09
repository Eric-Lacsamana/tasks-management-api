import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    this.logger.log('Registering user');
    try {
      return await this.authService.register({
        email: body.email,
        username: body.username,
        password: body.password,
        name: body.name,
      });
    } catch (error) {
      this.logger.error('Registration failed', error.stack);
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
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() body: { refreshToken: string }) {
    try {
      await this.authService.logout(body.refreshToken);
      return { message: 'Logged out successfully' };
    } catch (error) {
      this.logger.error('Logout failed', error.stack);
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(
    @Body() refreshTokenDto,
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.refreshTokens(refreshTokenDto);
    } catch (error) {
      this.logger.error('Failed to refresh tokens', error.stack);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
