import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Use environment variables in production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
