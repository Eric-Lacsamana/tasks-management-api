import {
  BadRequestException,
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
    console.log('TESS', userId);
    if (!userId) {
      throw new BadRequestException('User ID is required to get the tasks');
    }

    return this.tasksRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'], // Ensure that the user relation is loaded
    });
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

    if (task.user.id !== user.sub) {
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

  async markAsComplete(id: number, user): Promise<Task> {
    const task = await this.findOne(id);

    if (task.user.id !== user.sub) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.isComplete = true;
    return this.tasksRepository.save(task);
  }
}
