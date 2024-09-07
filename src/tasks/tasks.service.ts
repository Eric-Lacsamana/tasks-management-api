import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly userService: UsersService,
  ) {}

  async create({ title, description, user }: CreateTaskDto): Promise<Task> {
    let userEntity = null;

    if (user) {
      // Log the username being searched
      console.log('Looking up user with username:', user.username);

      // Fetch the user
      userEntity = await this.userService.findOneByUsername(user.username);
      console.log('testing ngaa', userEntity);
      if (!userEntity) {
        console.error(`User with username ${user.username} not found`); // Log if user not found
        throw new NotFoundException(
          `User with username ${user.username} not found`,
        );
      }
    }

    const task = this.tasksRepository.create({
      title,
      description,
      user: userEntity,
    });

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
