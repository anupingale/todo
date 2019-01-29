const { getCurrentActiveUser, updateUserTodoInFile } = require('./login');
const Todo = require('./model/todo');
const TodoList = require('./model/todoList');

const getUserInput = function(request) {
  let user = getCurrentActiveUser(request.cookies.username);
  const { title, description, todoId, taskId, taskDescription } = JSON.parse(request.body);
  let todo = new Todo(title, description);
  let todoList = new TodoList();
  todoList = user.todoList;
  return { user, todoList, todo, todoId, taskId, taskDescription };
};

const addUserTodo = function(request, response) {
  let { user, todoList, todo } = getUserInput(request);
  todoList.addTodo(todo);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const editUserTodo = function(request, response) {
  let { user, todoList, todoId, todo } = getUserInput(request);
  todoList.editTodo(todoId, todo);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const deleteUserTodo = function(request, response) {
  let { user, todoList, todoId } = getUserInput(request);
  todoList.deleteTodo(todoId);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const addTodoTask = function(request, response) {
  let { user, todoList, todoId, taskDescription } = getUserInput(request);
  todoList[todoId].addTask(taskDescription);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const editTodoTask = function(request, response) {
  let { user, todoList, todoId, taskId, taskDescription } = getUserInput(request);
  todoList[todoId].editTask(taskId, taskDescription);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const deleteTodoTask = function(request, response) {
  let { user, todoList, todoId, taskId } = getUserInput(request);
  todoList[todoId].deleteTask(taskId);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

const toggleTaskStatus = function(request, response) {
  let { user, todoList, todoId, taskId } = getUserInput(request);
  todoList[todoId].toggleTaskStatus(taskId);
  user.addTodoLists(todoList);
  updateUserTodoInFile(request);
  response.end();
};

module.exports = {
  addUserTodo,
  editUserTodo,
  deleteUserTodo,
  addTodoTask,
  editTodoTask,
  deleteTodoTask,
  toggleTaskStatus
};
