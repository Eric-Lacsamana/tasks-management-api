import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly userService: UsersService,
  ) {}

  async create({ title, description, user }: CreateTaskDto): Promise<Task> {
    let userEntity = null;

    if (user) {
      this.logger.log(`Looking up user with username: ${user.username}`);

      userEntity = await this.userService.findOneByUsername(user.username);
      if (!userEntity) {
        this.logger.error(`User with username ${user.username} not found`);
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

    this.logger.log(`Creating task with title: ${title}`);
    return this.tasksRepository.save(task);
  }

  async findAll(userId?: number): Promise<Task[]> {
    if (!userId) {
      this.logger.error('User ID is required to get the tasks');
      throw new BadRequestException('User ID is required to get the tasks');
    }

    this.logger.log(`Finding all tasks for user with ID: ${userId}`);
    return this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Task> {
    this.logger.log(`Finding task with ID: ${id}`);
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      this.logger.error(`Task with ID ${id} not found`);
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
      this.logger.error(
        `User ${user.sub} does not have permission to update task ${id}`,
      );
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    Object.assign(task, updateData);
    this.logger.log(`Updating task with ID: ${id}`);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    if (!task) {
      this.logger.error(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.logger.log(`Removing task with ID: ${id}`);
    await this.tasksRepository.remove(task);
  }

  async markAsComplete(id: number, user: User): Promise<Task> {
    const task = await this.findOne(id);

    if (task.user.id !== user.sub) {
      this.logger.error(
        `User ${user.sub} does not have permission to mark task ${id} as complete`,
      );
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    if (!task) {
      this.logger.error(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.isComplete = true;
    this.logger.log(`Marking task with ID: ${id} as complete`);
    return this.tasksRepository.save(task);
  }
}
