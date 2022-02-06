import {
  ParseUUIDPipe,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

import { TasksService } from './tasks.service';
import { ITask } from './tasks.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Tasks')
@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param('boardId', ParseUUIDPipe) boardId: UUIDType): Promise<ITask[]> {
    return this.taskService.getAll(boardId);
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
  ): Promise<ITask> {
    return this.taskService.getById(boardId, taskId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param('boardId', ParseUUIDPipe) boardId: UUIDType, @Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
  ): Promise<void> {
    return this.taskService.remove(boardId, taskId);
  }

  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId', ParseUUIDPipe) boardId: UUIDType,
    @Param('taskId', ParseUUIDPipe) taskId: UUIDType,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.taskService.update(boardId, taskId, updateTaskDto);
  }
}
