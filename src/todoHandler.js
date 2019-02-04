const Todo = require('./model/todo');
const { updateUsersTodoData } = require('./util');

const getCurrentUser = cookies => cookies.username;

const sendUserTodoList = function (response, cachedData, username) {
  const userTodoList = cachedData.usersTodo[username].todoLists;
  const user = cachedData.users[username].displayName
  response.send(JSON.stringify({ userTodoList, user }));
}

const renderTodoList = function (cachedData, request, response) {
  const username = getCurrentUser(request.cookies);
  sendUserTodoList(response, cachedData, username);
};

const addUserTodo = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { title, description } = request.body;
  const todo = new Todo(title, description);
  cachedData.usersTodo[currentUser].addTodo(todo);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const editUserTodo = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { title, description, todoId } = request.body;
  cachedData.usersTodo[currentUser].editTodo(todoId, { title, description });
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const deleteUserTodo = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId } = request.body;
  cachedData.usersTodo[currentUser].deleteTodo(todoId);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const addTodoTask = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { taskDescription, todoId } = request.body;
  cachedData.usersTodo[currentUser].todoLists[todoId].addTask(taskDescription);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const editTodoTask = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId, taskDescription } = request.body;
  cachedData.usersTodo[currentUser].todoLists[todoId].editTask(taskId, taskDescription);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const deleteTodoTask = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId } = request.body;
  cachedData.usersTodo[currentUser].todoLists[todoId].deleteTask(taskId);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
};

const toggleTaskStatus = function (cachedData, request, response) {
  const currentUser = getCurrentUser(request.cookies);
  const { todoId, taskId } = request.body;
  cachedData.usersTodo[currentUser].todoLists[todoId].toggleTaskStatus(taskId);
  updateUsersTodoData(cachedData.usersTodo);
  sendUserTodoList(response, cachedData, currentUser);
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
