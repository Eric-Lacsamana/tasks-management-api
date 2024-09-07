import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { Task } from './task.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { ExecutionContext } from '@nestjs/common';

// // Mock data
// const mockTask: Task = {
//   id: 1,
//   title: 'Test Task',
//   description: 'Test Description',
//   isCompleted: false,
// };

// Create a mock service
// const mockTasksService = {
//   create: jest.fn().mockResolvedValue(mockTask),
//   findAll: jest.fn().mockResolvedValue([mockTask]),
//   findOne: jest.fn().mockResolvedValue(mockTask),
//   update: jest.fn().mockResolvedValue(mockTask),
//   delete: jest.fn().mockResolvedValue(true),
// };

// // Mock JwtAuthGuard
// const mockJwtAuthGuard = {
//   canActivate: jest.fn().mockImplementation(() => true),
// };

describe('TasksController', () => {
  let controller: TasksController;
  // let service: TasksService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [TasksController],
  //     providers: [
  //       { provide: TasksService, useValue: mockTasksService },
  //       { provide: JwtAuthGuard, useValue: mockJwtAuthGuard },
  //     ],
  //   }).compile();

  //   controller = module.get<TasksController>(TasksController);
  //   service = module.get<TasksService>(TasksService);
  // });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a task', async () => {
  //     const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'New Description' };
  //     expect(await controller.create(createTaskDto)).toEqual(mockTask);
  //     expect(service.create).toHaveBeenCalledWith(createTaskDto);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of tasks', async () => {
  //     expect(await controller.findAll()).toEqual([mockTask]);
  //     expect(service.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a single task', async () => {
  //     expect(await controller.findOne('1')).toEqual(mockTask);
  //     expect(service.findOne).toHaveBeenCalledWith(1);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a task', async () => {
  //     const updateTaskDto: Partial<CreateTaskDto> = { title: 'Updated Task' };
  //     expect(await controller.update('1', updateTaskDto)).toEqual(mockTask);
  //     expect(service.update).toHaveBeenCalledWith(1, updateTaskDto);
  //   });
  // });

  // describe('delete', () => {
  //   it('should delete a task', async () => {
  //     expect(await controller.delete('1')).toBe(true);
  //     expect(service.delete).toHaveBeenCalledWith(1);
  //   });
  // });
});
