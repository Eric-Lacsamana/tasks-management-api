import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';


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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    const user = req.user;
    // Optionally, you can add validation here to ensure the user is authorized to update this task
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  async markAsCompleted(@Param('id') id: number) {
    return this.tasksService.markAsCompleted(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
