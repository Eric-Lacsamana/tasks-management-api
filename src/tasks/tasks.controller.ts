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
    return this.tasksService.findAll(user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id/complete')
  @UseGuards(AuthGuard)
  async markAsComplete(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.tasksService.markAsComplete(id, user);
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
