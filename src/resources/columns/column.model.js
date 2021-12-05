class Column {
  constructor({ id, title, order }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(task) {
    const { id, title, order } = task;
    return { id, title, order };
  }
}

module.exports = Column;
