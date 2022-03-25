import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column, IColumn } from './columns.entity';

@Injectable()
export class ColumnsService {
  constructor(@InjectRepository(Column) private columnsRepository: Repository<Column>) {}

  async getAll(): Promise<IColumn[]> {
    const resp = await this.columnsRepository.find({ select: ['id', 'title', 'order'] });
    return resp;
  }

  async getById(columnId: UUIDType): Promise<IColumn> {
    const column = await this.columnsRepository.findOne({ where: { id: columnId } });
    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }
    return column as IColumn;
  }

  async create(columnDto: CreateColumnDto): Promise<IColumn> {
    const modelColumn = await this.columnsRepository.create(columnDto).save();
    return modelColumn;
  }

  async remove(columnId: UUIDType): Promise<void> {
    const column = (await this.columnsRepository.findOne({ where: { id: columnId } })) as Column;
    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }
    await column.remove();
  }

  async update(columnId: UUIDType, body: UpdateColumnDto): Promise<IColumn> {
    const column = (await this.columnsRepository.findOne({ where: { id: columnId } })) as Column;
    if (!column) {
      throw new HttpException('Column was not founded!', HttpStatus.NOT_FOUND);
    }

    column.title = body.title;
    column.order = body.order;
    const { id, title, order } = await column.save();
    return { id, title, order };
  }
}
