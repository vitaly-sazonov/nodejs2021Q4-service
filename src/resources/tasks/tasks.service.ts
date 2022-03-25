import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';

import { Task, ITask } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

  async getAll(boardId: UUIDType): Promise<ITask[]> {
    const resp = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId })
      .select([
        'tasks.id',
        'tasks.title',
        'tasks.order',
        'tasks.description',
        'tasks.userId',
        'tasks.boardId',
        'tasks.columnId',
        'files.filename',
        'files.fileSize',
      ])
      .leftJoin('tasks.files', 'files')
      .getMany();
    return resp;
  }

  async getById(boardId: UUIDType, taskId: UUIDType): Promise<ITask> {
    const task = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ boardId, id: taskId })
      .select([
        'tasks.id',
        'tasks.title',
        'tasks.order',
        'tasks.description',
        'tasks.userId',
        'tasks.boardId',
        'tasks.columnId',
        'files.filename',
        'files.fileSize',
      ])
      .leftJoin('tasks.files', 'files')
      .getOne();
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(boardId: UUIDType, taskDto: CreateTaskDto): Promise<ITask> {
    const modelTask = await this.tasksRepository.create({ ...taskDto, boardId }).save();
    return modelTask;
  }

  async remove(boardId: UUIDType, taskId: UUIDType): Promise<void> {
    const task = (await this.tasksRepository.findOne({ where: { boardId, id: taskId } })) as Task;
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }
    await task.remove();
  }

  async update(boardId: UUIDType, taskId: UUIDType, body: UpdateTaskDto): Promise<ITask> {
    const task = (await this.tasksRepository.findOne({ where: { boardId, id: taskId } })) as Task;
    if (!task) {
      throw new HttpException('Task was not founded!', HttpStatus.NOT_FOUND);
    }

    task.title = body.title;
    task.order = body.order;
    task.description = body.description;
    task.userId = body.userId;
    task.boardId = body.boardId;
    task.columnId = body.columnId;
    const data = await task.save();
    return data;
  }
}
