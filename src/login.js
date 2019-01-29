const { parseUserInput, isEqual } = require('./util');
const { User } = require('../src/model/user');
const { USER_TODO, ENCODING } = require('./constant');
const { setCookie, redirect } = require('./handler');
const Todo = require('./model/todo');
const TodoList = require('./model/todoList');
const fs = require('fs');
let currentActiveUsers = {};

const getCurrentActiveUser = username => currentActiveUsers[username];

const getCurrentUserDetails = function (users, username) {
  const allUsers = users.get();
  return allUsers.filter(user => isEqual(user.username, username))[0];
};

const addUserToActiveUsersList = function (users, username) {
  const loggedInUserDetails = getCurrentUserDetails(users, username);
  currentActiveUsers[username] = createUser(loggedInUserDetails);
};

const getCurrentUserTodoList = function (todoList, username) {
  const getUsername = todo => Object.keys(todo)[0];
  return todoList.filter(todo => getUsername(todo) == username)[0];
};

const isValidUser = function (users, loginDetails) {
  const isValidUsername = username => isEqual(username, loginDetails.username);
  const isValidPassword = password => isEqual(password, loginDetails.password);
  const matchedUsers = users.filter(
    ({ username, password }) => isValidUsername(username) && isValidPassword(password)
  );
  return matchedUsers.length == 1;
};

const getTodoList = function (username) {
  const content = fs.readFileSync(USER_TODO, ENCODING);
  const todoList = JSON.parse(content);
  const userTodoList = getCurrentUserTodoList(todoList, username);
  if (userTodoList) {
    return userTodoList[username];
  }
  return {};
};

const mapTaskWithTodo = function (userTodoList, todoList, todoID) {
  const { title, description, tasks } = userTodoList[todoID];
  const todo = new Todo(title, description, tasks);
  todoList.addTodo(todo);
  return todoList;
};

const createUser = function (usersDetails) {
  const { displayName, username, password } = usersDetails;
  const userTodoList = getTodoList(username);
  const todoIDs = Object.keys(userTodoList);
  let todoList = new TodoList();
  todoIDs.reduce(mapTaskWithTodo.bind(null, userTodoList), todoList);
  let user = new User(displayName, username, password);
  user.addTodoLists(todoList);
  return user;
};

const loginHandler = function (users, request, response) {
  const loginDetails = parseUserInput(request.body);
  const username = loginDetails.username;
  if (isValidUser(users.get(), loginDetails)) {
    addUserToActiveUsersList(users, username);
    setCookie(response, 'username=' + username);
    redirect(response, '/pages/todo.html');
    return;
  }
  response.write('Invalid login credentials');
  response.end();
};

const renderLoginPage = function (request, response, next) {
  const cookie = request.cookies.username;
  if (cookie) {
    redirect(response, '/pages/todo.html');
    return;
  }
  next();
};

const updateUserTodoInFile = function (request) {
  let todoLists = JSON.parse(fs.readFileSync(USER_TODO, ENCODING));
  const user = getCurrentActiveUser(request.cookies.username);
  todoLists.forEach(todoList => {
    if (todoList.hasOwnProperty(user.username)) {
      todoList[user.username] = user.todoList;
    }
  });
  fs.writeFile(USER_TODO, JSON.stringify(todoLists), err => { });
};

const renderTodoList = function (request, response) {
  let user = getCurrentActiveUser(request.cookies.username);
  response.write(JSON.stringify(user.todoList));
  response.end();
};

module.exports = {
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage,
  renderTodoList,
  getCurrentActiveUser,
  updateUserTodoInFile
};
