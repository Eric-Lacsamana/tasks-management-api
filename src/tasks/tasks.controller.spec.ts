import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: { title: string; description: string },
    @Req() req,
  ) {
    const user = req.user;
    return this.tasksService.create(body.title, body.description, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    const user = req.user;
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }
}
