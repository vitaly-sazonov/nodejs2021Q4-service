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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CreateColumnDto } from './dto/create-column.dto';

import { ColumnsService } from './columns.service';
import { IColumn, Column } from './columns.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Columns')
@Controller('/columns')
@UseGuards(AuthGuard)
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @ApiOperation({ summary: 'Get all columns' })
  @ApiResponse({ status: 200, type: [Column] })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IColumn[]> {
    return this.columnService.getAll();
  }

  @ApiOperation({ summary: 'Get the column by id' })
  @ApiResponse({ status: 200, type: Column })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Get(':columnId')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('columnId', ParseUUIDPipe) columnId: UUIDType): Promise<IColumn> {
    return this.columnService.getById(columnId);
  }

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, type: Column })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createColumnDto: CreateColumnDto): Promise<IColumn> {
    return this.columnService.create(createColumnDto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 204 })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Delete(':columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('columnId', ParseUUIDPipe) columnId: UUIDType): Promise<void> {
    return this.columnService.remove(columnId);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, type: Column })
  @ApiParam({ name: 'columnId', description: 'ID Column' })
  @Put(':columnId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('columnId', ParseUUIDPipe) columnId: UUIDType,
    @Body() updateColumnDto: CreateColumnDto,
  ): Promise<IColumn> {
    return this.columnService.update(columnId, updateColumnDto);
  }
}
