import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Only authenticated users can access these routes
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const user = req.user; // This should be the logged-in user
    const task = new Task();
    Object.assign(task, createTaskDto);
    return this.tasksService.create(task, user);
  }

  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    const user = req.user; // This should be the logged-in user
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Task> {
    const user = req.user; // This should be the logged-in user
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req): Promise<Task> {
    const user = req.user; // This should be the logged-in user
    return this.tasksService.update(id, updateTaskDto, user);
  }


  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    const user = req.user; // This should be the logged-in user
    return this.tasksService.remove(id, user);
  }
}
