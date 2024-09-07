import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(title: string, description: string, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, user });
    return this.tasksRepository.save(task);
  }

  async findAll(userId?: number): Promise<Task[]> {
    if (userId) {
      return this.tasksRepository.find({
        where: { user: { id: userId } },
      });
    }
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    id: number,
    updateData: Partial<Task>,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id);
    if (task.user.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    Object.assign(task, updateData);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id); // Check if the task exists
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.remove(task);
  }

  async markAsCompleted(id: number): Promise<Task> {
    const task = await this.findOne(id); // Check if the task exists
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.isCompleted = true;
    return this.tasksRepository.save(task);
  }
}
