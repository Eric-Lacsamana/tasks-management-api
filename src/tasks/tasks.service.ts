import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: user } });
  }

  async findOne(id: number, user: User): Promise<Task> {
    return this.tasksRepository.findOne({
      where: { id: id, user: user },
    });
  }

  async create(task: Task, user: User): Promise<Task> {
    task.user = user;
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateData: Partial<Task>, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Update fields
    Object.assign(task, updateData);

    return this.tasksRepository.save(task);
  }


  async remove(id: number, user: User): Promise<void> {
    await this.tasksRepository.delete({ id: id, user: user });
  }
}
