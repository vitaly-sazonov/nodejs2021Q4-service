class Task {
  constructor({ id, title, order, description, userId, boardId, columnId }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId; // assignee
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
