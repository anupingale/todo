const { isListEmpty } = require('../util.js');

class TodoList {
  getNewTodoId() {
    const todoIds = Object.keys(this);
    if (isListEmpty(todoIds)) return 1;
    const lastTodoId = Math.max.apply(null, todoIds);
    return lastTodoId + 1;
  }

  addTodo(todo) {
    const todoID = this.getNewTodoId(); 
    this[todoID] = todo;
  }

  editTodo(todoId, todo) {
    this[todoId].title = todo.title;
    this[todoId].description = todo.description;
  }

  deleteTodo(todoID) {
    delete this[todoID];
  }
}

module.exports = TodoList;
