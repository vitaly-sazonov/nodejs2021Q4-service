import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { Board, IBoard } from './boards.entity';

import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    private columnsRepository: ColumnsService,
  ) {}

  async getAll(): Promise<IBoard[]> {
    const resp = await this.boardsRepository

      // .find({
      //   select: ['id', 'title', 'columns'],
      //   relations: ['columns'],
      // });
      .createQueryBuilder('boards')
      .innerJoinAndSelect('boards.columns', 'columns')
      .select(['boards.id as id', 'boards.title as title'])
      .addSelect(
        'json_agg((SELECT x FROM (SELECT columns.id, columns.title, columns."order" ORDER BY columns."order" asc) AS x ) ORDER BY "order" )',
        'columns',
      )
      .groupBy('boards.id')
      .getRawMany();

    return resp;
  }

  async getById(id: UUIDType): Promise<IBoard> {
    const board = await this.boardsRepository
      .createQueryBuilder('boards')
      .innerJoinAndSelect('boards.columns', 'columns')
      .select(['boards.id as id', 'boards.title as title'])
      .addSelect(
        'json_agg((SELECT x FROM (SELECT columns.id, columns.title, columns."order" ORDER BY columns."order" asc) AS x ) ORDER BY "order" )',
        'columns',
      )
      .groupBy('boards.id')
      .where('boards.id = :id', { id })
      .getRawOne();

    // .findOne({
    //   select: ['id', 'title', 'columns'],
    //   relations: ['columns'],
    //   where: { id },
    // });
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }
    return board as IBoard;
  }

  async create(boardDto: CreateBoardDto): Promise<IBoard> {
    const board = new Board();
    board.title = boardDto.title;
    const modelBoard = await this.boardsRepository.save(board);

    const columns = await Promise.all(
      boardDto.columns.map(async ({ title, order }) => {
        const column = await this.columnsRepository.create({ title, order, boardId: modelBoard.id });
        return { id: column.id, title: column.title, order: column.order };
      }),
    );

    return { id: modelBoard.id, title: modelBoard.title, columns };
  }

  async remove(id: UUIDType): Promise<void> {
    const board = (await this.boardsRepository.findOne({ where: { id } })) as Board;
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }
    await board.remove();
  }

  async update(id: UUIDType, body: UpdateBoardDto): Promise<IBoard> {
    const board = (await this.boardsRepository.findOne({ relations: ['columns'], where: { id } })) as Board;
    if (!board) {
      throw new HttpException('Board was not founded!', HttpStatus.NOT_FOUND);
    }

    board.title = body.title;
    const data = await board.save();
    return data;
  }
}
