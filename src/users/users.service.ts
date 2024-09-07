import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
}

// import {
//   Injectable,
//   // ConflictException,
//   // NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// // import * as bcrypt from 'bcrypt';
// // import { RegisterDto } from './dto/register.dto';
// // import { UserResponseDto } from './dto/user-response.dto';
// // import { CreateUserDto } from './interfaces/create-user.interface';
// // import { UserResponseDto } from './interfaces/user-response.interface';
// // import { LoginResponseDto } from './interfaces/login-response.interface';

// @Injectable()
// export class UsersService {
//   private readonly jwtSecret = 'your-jwt-secret'; // Store this securely

//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   // async register(dto: RegisterDto): Promise<UserResponseDto> {
//   //   const { email, password, username, name } = dto;

//   //   const hashedPassword = await bcrypt.hash(password, 10);
//   //   const user = this.userRepository.create({
//   //     email,
//   //     password: hashedPassword,
//   //     username,
//   //     name,
//   //   });

//   //   const savedUser = await this.userRepository.save(user);
//   //   return this.toUserResponse(savedUser);
//   // }

//   // async login(email: string, password: string): Promise<LoginResponseDto> {
//   //   const user = await this.userRepository.findOne({ where: { email } });
//   //   if (!user || !(await bcrypt.compare(password, user.password))) {
//   //     throw new NotFoundException('Invalid credentials');
//   //   }

//   //   const payload = { email: user.email, sub: user.id };
//   //   const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
//   //   return { token };
//   // }

//   // private toUserResponse(user: User): UserResponseDto {
//   //   const { id, email, username, name } = user;
//   //   return { id, email, username, name };
//   // }
// }
