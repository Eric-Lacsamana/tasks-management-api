import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';
// import { v4 as uuidv4 } from 'uuid';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   private resetTokens = new Map<string, string>();
//   constructor(
//     private readonly usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async register(email: string, username: string, password: string) {
//     return this.usersService.create(email, username, password);
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async hashPassword(password: string): Promise<string> {
//     return bcrypt.hash(password, 10);
//   }

//   async comparePassword(
//     password: string,
//     hashedPassword: string,
//   ): Promise<boolean> {
//     return bcrypt.compare(password, hashedPassword);
//   }

//   async forgotPassword(username: string) {
//     const user = await this.usersService.findOne(username);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     const token = uuidv4();
//     this.resetTokens.set(token, username);
//     // Send email logic here (e.g., using nodemailer)
//     console.log(`Password reset token for ${username}: ${token}`);
//     return token;
//   }

//   async resetPassword(token: string, newPassword: string) {
//     const username = this.resetTokens.get(token);
//     if (!username) {
//       throw new Error('Invalid or expired token');
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await this.usersService.updatePassword(username, hashedPassword);
//     this.resetTokens.delete(token);
//     return { message: 'Password reset successfully' };
//   }
// }
