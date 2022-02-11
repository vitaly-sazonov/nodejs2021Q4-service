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

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { BoardsService } from './boards.service';
import { IBoard, Board } from './boards.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IBoard[]> {
    return this.boardService.getAll();
  }

  @ApiOperation({ summary: 'Get the board by id' })
  @ApiResponse({ status: 200, type: Board })
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<IBoard> {
    return this.boardService.getById(id);
  }

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 201, type: Board })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 204 })
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<void> {
    return this.boardService.remove(id);
  }

  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({ status: 200, type: Board })
  @ApiParam({ name: 'id', description: 'ID Board' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: UUIDType, @Body() updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    return this.boardService.update(id, updateBoardDto);
  }
}
