class TodoList {
  constructor(id, list) {
    this.id = id;
    this.todoLists = list;
  }

  updateID() {
    this.id = this.id + 1;
  }

  addTodo(todo) {
    this.updateID();
    this.todoLists[this.id] = todo;
  }

  editTodo(todoId, todo) {
    this.todoLists[todoId].title = todo.title;
    this.todoLists[todoId].description = todo.description;
  }

  deleteTodo(todoID) {
    delete this.todoLists[todoID];
  }
}

module.exports = TodoList;
