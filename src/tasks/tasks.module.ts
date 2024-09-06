import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Import the Task entity here
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService], // Export TasksService if it needs to be used in other modules
})
export class TasksModule {}