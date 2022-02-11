import { Connection } from 'typeorm';

import { Board, BoardType } from './board.model';
import { ResourceError } from '../../common/errors';

/**
 * Class BoardRepository for accessing Board data
 */
class BoardRepository {
  /**
   * Get all boards from database
   * @returns array of objects data the board
   */
  async getAll(db: Connection): Promise<BoardType[]> {
    const arrayBoards = await db.getRepository(Board).find();
    return arrayBoards;
  }

  /**
   * Add board in db
   * @param board - data board \{title, columns\}
   * @returns object board \{id, title, columns\}
   */
  async add(db: Connection, board: BoardType): Promise<BoardType> {
    const modelBoard = db.getRepository(Board).create({ ...board });
    await modelBoard.save();
    return modelBoard;
  }

  /**
   * Get board record by id from db
   * @param id - board record uuid
   * @returns object board \{id, title, columns\}
   */
  async get(db: Connection, id: UUIDType): Promise<BoardType> {
    const board = await db.getRepository(Board).findOne({ select: ['id', 'title', 'columns'], where: { id } });
    if (!board) {
      throw new ResourceError('board', 404, 'Board was not founded!');
    }
    return board as BoardType;
  }

  /**
   * Update board record by id from db
   * @param id - board record uuid
   * @param body - new board data of record
   * @returns object board \{id, title, columns\}
   */
  async update(db: Connection, id: UUIDType, body: BoardType): Promise<BoardType> {
    const board = await db.getRepository(Board).findOne({ where: { id } });
    if (!board) {
      throw new ResourceError('board', 404, 'Board was not founded!');
    }

    board.title = body.title;
    board.columns = body.columns;
    const data = await board.save();
    return data;
  }

  /**
   * Delete board record by id from db
   * @param id - board record uuid
   * @returns returns boolean type of query result
   */
  async remove(db: Connection, id: UUIDType): Promise<void> {
    const board = (await db.getRepository(Board).findOne({ where: { id } })) as Board;
    await board.remove();
  }
}

export default BoardRepository;
