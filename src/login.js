const { parseUserInput, isEqual } = require('./util.js');
const { User } = require('../src/model/user.js');
const { USER_TODO, ENCODING } = require('./constant.js');
const Todo = require('./model/todo');
const TodoList = require('./model/todoList');
let loggedInUser;

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

const loginHandler = function (users, request, response) {
  const loginDetails = request.body;
  const usersDetail = users.get();
  if (isValidUser(usersDetail, loginDetails)) {
    let loggedInUserDetails = users.get().filter(user => isEqual(user.username, loginDetails.username));
    loggedInUser = createUser(loggedInUserDetails[0]);
    response.setHeader('Set-Cookie', 'username=' + loginDetails.username);
    response.writeHead(302, { Location: '/pages/todo.html' });
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

const insertTodo = function (request, response) {
  let details = request.body;
  let todo = new Todo(details.title, details.description);
  todo.addTask(details.task_detail);
  loggedInUser.addTodoLists(todo);
  response.end();
}

module.exports = {
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage,
  insertTodo
};
