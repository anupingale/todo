const { isListEmpty } = require('../util.js');

class Todo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = {};
  }

  getNewTaskId() {
    const taskIds = Object.keys(this.tasks);
    if (isListEmpty(taskIds)) return 1;
    const lastTaskId = Math.max.apply(null, taskIds);
    return lastTaskId + 1;
  }

  addTask(description) {
    const taskId = this.getNewTaskId();
    this.tasks[taskId] = { description, status: false };
  }

  editTask(taskId, description) {
    this.tasks[taskId].description = description;
  }

  deleteTask(taskId) {
    delete this.tasks[taskId];
  }

  done(taskId) {
    this.tasks[taskId].status = true;
  }

  undone(taskId) {
    this.tasks[taskId].status = false;
  }
}

module.exports = Todo;
