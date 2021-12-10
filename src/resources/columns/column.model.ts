export type ColumnType = { id: string; title: string; order: number };

/**
 * Class Column format.
 */
class Column {
  /** @public uuid record */
  id: string;
  /** @public title column */
  title: string;
  /** @public the order of the columns in the board */
  order: number;

  /**
   * Constructor class Column
   * @param object - data column format \{id, title, order\}
   * @returns Instance class Column
   */
  constructor({ id, title, order }: ColumnType) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Static formating function
   * @param column - instance class Column
   * @returns object - truncated data format to \{id, title, order\}
   */
  static toResponse(column: ColumnType) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default Column;
