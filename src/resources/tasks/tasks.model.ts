export type TaskType = { id: string; title: string; order: number; description: string; userId: string | null; boardId: string; columnId: string };

class Task {
  /** @public record uuid */
  id: string;
  /** @public title column */
  title: string;
  /** @public the order of the task in the list */
  order: number;
  /** @public task description */
  description: string;
  /** @public user uuid */
  userId: string | null;
  /** @public board uuid */
  boardId: string;
  /** @public board uuid */
  columnId: string;

  /**
   * Constructor class Task
   * @param object - data task format \{ id, title, order, description, userId, boardId, columnId \}
   * @returns Instance class Task
   */
  constructor({ id, title, order, description, userId, boardId, columnId }: TaskType) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId; // assignee
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Static formating function
   * @param task - instance class Task
   * @returns object - truncated data format to \{id, title, order, description, userId, boardId, columnId\}
   */
  static toResponse(task: TaskType) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
