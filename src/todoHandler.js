const Todo = require('./model/todo');
const { updateUsersTodoData, getUsersTodo } = require('./util');

const usersTodo = getUsersTodo();

const getCurrentUser = cookies => cookies.username;

const renderTodoList = function (request, response) {
  let user = request.cookies.username;
  response.write(JSON.stringify(usersTodo[user].todoLists));
  response.end();
};

const addUserTodo = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { title, description } = JSON.parse(request.body);
  const todo = new Todo(title, description);
  usersTodo[currentUser].addTodo(todo);
  updateUsersTodoData(usersTodo);
  response.end();
};

const editUserTodo = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { title, description, todoId } = JSON.parse(request.body);
  usersTodo[currentUser].editTodo(todoId, { title, description });
  updateUsersTodoData(usersTodo);
  response.end();
};

const deleteUserTodo = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId } = JSON.parse(request.body);
  usersTodo[currentUser].deleteTodo(todoId);
  updateUsersTodoData(usersTodo);
  response.end();
};

const addTodoTask = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { taskDescription, todoId } = JSON.parse(request.body);
  usersTodo[currentUser].todoLists[todoId].addTask(taskDescription);
  updateUsersTodoData(usersTodo);
  response.end();
};

const editTodoTask = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId, taskDescription } = JSON.parse(request.body);
  usersTodo[currentUser].todoLists[todoId].editTask(taskId, taskDescription);
  updateUsersTodoData(usersTodo);
  response.end();
};

const deleteTodoTask = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId } = JSON.parse(request.body);
  usersTodo[currentUser].todoLists[todoId].deleteTask(taskId);
  updateUsersTodoData(usersTodo);
  response.end();
};

const toggleTaskStatus = function (request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId } = JSON.parse(request.body);
  usersTodo[currentUser].todoLists[todoId].toggleTaskStatus(taskId);
  updateUsersTodoData(usersTodo);
  response.end();
};

module.exports = {
  addUserTodo,
  editUserTodo,
  deleteUserTodo,
  addTodoTask,
  editTodoTask,
  deleteTodoTask,
  toggleTaskStatus,
  renderTodoList
};
