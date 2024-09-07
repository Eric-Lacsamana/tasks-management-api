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
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: { title: string; description: string },
    @Req() req,
  ) {
    const user: UserDto = req.user;

    return this.tasksService.create({
      title: body.title,
      description: body.description,
      user,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() req) {
    const user = req.user;
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    const user = req.user;

    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Patch(':id/complete')
  @UseGuards(AuthGuard)
  async markAsCompleted(@Param('id') id: number) {
    return this.tasksService.markAsCompleted(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
