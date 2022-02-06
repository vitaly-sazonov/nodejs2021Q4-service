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

import { CreateColumnDto } from './dto/create-column.dto';

import { ColumnsService } from './columns.service';
import { IColumn } from './columns.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Columns')
@Controller('/columns')
@UseGuards(AuthGuard)
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IColumn[]> {
    return this.columnService.getAll();
  }

  @Get(':columnId')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('columnId', ParseUUIDPipe) columnId: UUIDType): Promise<IColumn> {
    return this.columnService.getById(columnId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createColumnDto: CreateColumnDto): Promise<IColumn> {
    return this.columnService.create(createColumnDto);
  }

  @Delete(':columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('columnId', ParseUUIDPipe) columnId: UUIDType): Promise<void> {
    return this.columnService.remove(columnId);
  }

  @Put(':columnId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Body() updateColumnDto: CreateColumnDto,
  ): Promise<IColumn> {
    return this.columnService.update(columnId, updateColumnDto);
  }
}
