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

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { BoardsService } from './boards.service';
import { IBoard } from './boards.entity';

import { AuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<IBoard[]> {
    return this.boardService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<IBoard> {
    return this.boardService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return this.boardService.create(createBoardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUIDType): Promise<void> {
    return this.boardService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseUUIDPipe) id: UUIDType, @Body() updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    return this.boardService.update(id, updateBoardDto);
  }
}
