const fs = require('fs');
const { User } = require('./model/user');
const { parseUserInput } = require('./util');
const {
  USER_DETAIL_FILE,
  ENCODING,
  HOME_PAGE,
  STATUS_REDIRECTION_FOUND,
  USER_TODO
} = require('./constant');

const addUserInTodoList = function (username) {
  let userTodoList = [];
  if (fs.existsSync(USER_TODO)) {
    userTodoList = JSON.parse(fs.readFileSync(USER_TODO, ENCODING));
  }
  let newUserTodo = {};
  newUserTodo[username] = {};
  userTodoList.push(newUserTodo);
  fs.writeFile(USER_TODO, JSON.stringify(userTodoList), err => { });
}

const writeUserDetails = function (users) {
  return fs.writeFileSync(USER_DETAIL_FILE, users);
};

const loadUserDetails = function (users) {
  if (fs.existsSync(USER_DETAIL_FILE)) {
    const content = fs.readFileSync(USER_DETAIL_FILE, ENCODING);
    users.set(JSON.parse(content));
  }
};

const signupHandler = function (users, request, response) {
  const { displayName, username, password } = parseUserInput(request.body);
  const user = new User(displayName, username, password);
  users.add(user);
  addUserInTodoList(username);
  writeUserDetails(JSON.stringify(users.get()));
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
};

module.exports = { signupHandler, loadUserDetails };
