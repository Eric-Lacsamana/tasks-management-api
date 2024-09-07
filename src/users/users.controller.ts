import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}

// import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';

// @Controller('auth')
// export class UsersController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(
//     @Body() body: { email: string; username: string; password: string },
//   ) {
//     return this.authService.register(body.email, body.username, body.password);
//   }

//   @Post('login')
//   async login(@Body() body: { username: string; password: string }) {
//     const user = await this.authService.validateUser(
//       body.username,
//       body.password,
//     );
//     if (!user) {
//       return { message: 'Invalid credentials' };
//     }
//     return this.authService.login(user);
//   }

//   @Post('forgot-password')
//   async forgotPassword(@Body() body: { username: string }) {
//     return this.authService.forgotPassword(body.username);
//   }

//   @Post('reset-password')
//   async resetPassword(@Body() body: { token: string; newPassword: string }) {
//     return this.authService.resetPassword(body.token, body.newPassword);
//   }
// }
