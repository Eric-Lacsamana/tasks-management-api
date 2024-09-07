import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { Task } from '../tasks/task.entity';

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

  @OneToMany(() => Task, (task) => task.user) // One user can have many tasks
  tasks: Task[];

  @Column({ unique: true, nullable: true })
  sub?: number;
}
