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
  const { displayName, username, password } = request.body;
  const user = new User(displayName, username, password);
  users.add(user);
  writeUserDetails(JSON.stringify(users.get()));
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
};


const todoListHandler = function (users, request, response) {
  const loggedInUser = request.cookies.username;
  // let loggedInUserDetails = users.get().filter(user => isEqual(user.username, loggedInUser));
    // let user = createUser(loggedInUserDetails[0]);
    // response.write(JSON.stringify(JSON.stringify(user.todoList)));
    response.end();
}

module.exports = {
  signupHandler,
  loadUserDetails,
  todoListHandler
};
