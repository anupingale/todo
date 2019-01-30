class Todo {
  constructor(title, description, tasks = {}) {
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }

  getNewTaskId() {
    const taskIds = Object.keys(this.tasks);
    if (taskIds.length == 0) return 1;
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

  toggleTaskStatus(taskId) {
    this.tasks[taskId].status = !this.tasks[taskId].status;
  }
}

module.exports = Todo;
