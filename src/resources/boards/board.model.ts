import { ColumnType } from '../columns/column.model';

export type BoardType = { id: string; title: string; columns: ColumnType[] };

/**
 * Class Board format.
 */
class Board {
  /** @public uuid record */
  id: string;
  /** @public title board */
  title: string;
  /** @public array of objects the column */
  columns: ColumnType[] = [];

  /**
   * Constructor class Board
   * @param object - data board format \{id, title, columns\}
   * @returns Instance class Board
   */
  constructor({ id, title, columns }: BoardType) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Static formating function
   * @param board - instance class Board
   * @returns object - truncated data format to \{id, title, columns\}
   */
  static toResponse(board: BoardType) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
