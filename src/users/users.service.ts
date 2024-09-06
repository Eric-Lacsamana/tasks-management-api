import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  private readonly users = [];
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  async createUser(email: string, username: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ username, password });
    return this.usersRepository.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
      return this.usersRepository.findOne({ where: { username } });
    }

    async create(email: string, username: string, password: string): Promise<User> {

      // Validate existing user
      const existingUser = await this.usersRepository.findOne({
        where: {
          username: username,
          email: email
        }});

      if (existingUser) {
        throw new ConflictException('username or email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      const user = this.usersRepository.create({ email, username, password: hashedPassword });
      return this.usersRepository.save(user);
    }

    async findOne(username: string): Promise<User | undefined> {
      return this.usersRepository.findOneBy({ username });
    }

    async updatePassword(username: string, password: string) {
      const user = this.users.find(u => u.username === username);
      if (user) {
        user.password = password;
        return user;
      }
      throw new Error('User not found');
    }
}





