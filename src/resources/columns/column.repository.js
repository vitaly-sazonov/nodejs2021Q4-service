const uuid = require('uuid');

const Column = require('./column.model');
const db = require('../../db');

class ColumnRepository {
  constructor() {
    this._columns = db.columns;
  }

  add(column) {
    const id = uuid.v4();
    const instance = new Column({ ...column, id });
    this._column.set(instance.id, instance);
    return Column.toResponse(instance);
  }

  get(id) {
    if (!this._column.has(id)) {
      throw new Error('Column was not founded!');
    }
    const user = this._column.get(id);
    return user;
  }

  remove(id) {
    return this._tasks.delete(id);
  }
}

module.exports = ColumnRepository;
