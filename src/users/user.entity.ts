import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { RefreshToken } from 'src/auth/refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Column({ unique: true, nullable: true })
  sub?: number;
}
