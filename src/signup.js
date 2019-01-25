const { User } = require('./model/user.js');
const Todo = require('./model/todo');
const TodoList = require('./model/todoList');
const { parseUserInput, isEqual } = require('./util.js');
const fs = require('fs');
const {
  USER_DETAIL_FILE,
  ENCODING,
  HOME_PAGE,
  STATUS_REDIRECTION_FOUND,
  USER_TODO
} = require('./constant.js');

const writeUserDetails = function (users) {
  return fs.writeFileSync(USER_DETAIL_FILE, users);
};

const loadUserDetails = function (users) {
  if (fs.existsSync(USER_DETAIL_FILE)) {
    const content = fs.readFileSync(USER_DETAIL_FILE, ENCODING);
    users.set(JSON.parse(content));
    return;
  }
  writeUserDetails('[]');
};

const signupHandler = function (users, request, response) {
  const { displayName, username, password } = parseUserInput(request.body);
  const user = new User(displayName, username, password);
  users.add(user);
  writeUserDetails(JSON.stringify(users.get()));
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
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

const todoListHandler = function (users, request, response) {
  const loggedInUser = request.cookies.username;
  let loggedInUserDetails = users.get().filter(user => isEqual(user.username, loggedInUser));
  if (loggedInUserDetails.length > 0) {
    let user = createUser(loggedInUserDetails[0]);
    response.write(JSON.stringify(JSON.stringify(user.todoList)));
    response.end();
  }
}

module.exports = {
  signupHandler,
  loadUserDetails,
  todoListHandler,
  getTodoList
};
