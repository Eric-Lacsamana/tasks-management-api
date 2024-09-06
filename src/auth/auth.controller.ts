import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      // Handle unauthorized access
    }
    return this.authService.login(user);
  }
}



// import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() body: { email: string, username: string; password: string }) {
//     return this.authService.register(body.email, body.username, body.password);
//   }

//   @Post('login')
//   @UseGuards(AuthGuard)  // Apply the guard to this route
//   async login(@Body('password') password: string, @Body('hashedPassword') hashedPassword: string): Promise<string> {
//     const isMatch = await this.authService.validateUser(password, hashedPassword);
//     if (isMatch) {
//       return 'Login successful';
//     } else {
//       throw new UnauthorizedException('Invalid credentials');  // Throw unauthorized exception if credentials are invalid
//     }
//   }
// }

