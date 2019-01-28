const { parseUserInput, isEqual } = require('./util.js');
const { User } = require('../src/model/user.js');
const { USER_TODO, ENCODING } = require('./constant.js');
const Todo = require('./model/todo');
const TodoList = require('./model/todoList');
let loggedUserArray = {};

const fs = require('fs');
const isValidUser = function (users, loginDetails) {
  const isValidUsername = (username) => isEqual(username, loginDetails.username);
  const isValidPassword = (password) => isEqual(password, loginDetails.password);
  const matchedUsers = users.filter(({ username, password }) =>
    isValidUsername(username) && isValidPassword(password));
  return matchedUsers.length == 1;
};


const getTodoList = function (username) {
  let content = fs.readFileSync(USER_TODO, ENCODING);
  let todoList = JSON.parse(content);
  let userTodoList = todoList.filter(todo => Object.keys(todo)[0] == username)[0];
  if (userTodoList) {
    return userTodoList[username];
  }
  return {};
}

const mapTaskWithTodo = function (rawTodoLists, todoList, todoID) {
  let { title, description, tasks } = rawTodoLists[todoID];
  let todo = new Todo(title, description, tasks);
  todoList.addTodo(todo);
  return todoList;
}

const createUser = function (usersDetails) {
  let { displayName, username, password } = usersDetails;
  let user = new User(displayName, username, password);
  const rawTodoLists = getTodoList(username);
  let todoIDs = Object.keys(rawTodoLists);
  let todoList = new TodoList();
  todoIDs.reduce(mapTaskWithTodo.bind(null, rawTodoLists), todoList);
  user.addTodoLists(todoList);
  return user;
};

const getCurrentUser = function (username) {
  return loggedUserArray[username];
}

const loginHandler = function (users, request, response) {
  const loginDetails = parseUserInput(request.body);
  const usersDetail = users.get();
  if (isValidUser(usersDetail, loginDetails)) {
    let loggedInUserDetails = users.get().filter(user => isEqual(user.username, loginDetails.username));
    let username = loginDetails.username;
    loggedUserArray[username] = createUser(loggedInUserDetails[0]);
    response.setHeader('Set-Cookie', 'username=' + loginDetails.username);
    response.statusCode = 302;
    response.setHeader('Location', '/pages/todo.html');
    // response.writeHead(302, { Location: '/pages/todo.html' });
    response.end();
    return;
  }
  response.write('Invalid login credentials');
  response.end();
};

const renderLoginPage = function (request, response, next) {
  const cookie = request.cookies.username;
  if (cookie) {
    response.writeHead(302, { Location: '/pages/todo.html' });
    response.end();
    return;
  }
  next();
};

const writeTodoFile = function (request) {
  let data = JSON.parse(fs.readFileSync(USER_TODO, 'utf-8'));
  let user = loggedUserArray[request.cookies.username];

  for (let i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty(user.username)) {
      data[i][user.username] = user.todoList;
    }
  }
  fs.writeFile(USER_TODO, JSON.stringify(data), err => { });
}

const todoListHandler = function (request, response) {
  let user = getCurrentUser(request.cookies.username);
  response.write(JSON.stringify(user.todoList));
  response.end();
}

const addUserTodo = function (request, response) {
  let user = getCurrentUser(request.cookies.username);
  const { title, description } = JSON.parse(request.body);
  let todo = new Todo(title, description);
  let todoList = new TodoList();
  todoList = user.todoList;
  todoList.addTodo(todo);
  user.addTodoLists(todoList);
  writeTodoFile(request);
  response.end();
}

const editUserTodo = function (request, response) {
  let user = getCurrentUser(request.cookies.username);
  const { id, title, description } = JSON.parse(request.body);
  let todoList = new TodoList();
  todoList = user.todoList;
  todoList.editTodo(id, { title, description });
  user.addTodoLists(todoList);
  writeTodoFile(request);
  response.end();
}

const deleteUserTodo = function (request, response) {
  let user = getCurrentUser(request.cookies.username);
  const { id } = JSON.parse(request.body);
  let todoList = new TodoList();
  todoList = user.todoList;
  todoList.deleteTodo(id);
  user.addTodoLists(todoList);
  writeTodoFile(request);
  response.end();
}

module.exports = {
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage,
  todoListHandler,
  addUserTodo,
  editUserTodo,
  deleteUserTodo
};
