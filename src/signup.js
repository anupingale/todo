const { User } = require('./model/user.js');
const fs = require('fs');
const {
  USER_DETAIL_FILE,
  ENCODING,
  HOME_PAGE,
  STATUS_REDIRECTION_FOUND,
  KEY_SEPERATOR,
  KEY_VALUE_SEPERATOR
} = require('./constant.js');

const parseUserInput = userDetails => {
  const args = {};
  const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  userDetails.split(KEY_SEPERATOR).map(splitKeyValue).forEach(assignKeyValueToArgs);
  return args;
};

const writeUserDetails = function(users) {
  return fs.writeFileSync(USER_DETAIL_FILE, users);
};

const loadUserDetails = function(users) {
  if (fs.existsSync(USER_DETAIL_FILE)) {
    const content = fs.readFileSync(USER_DETAIL_FILE, ENCODING);
    users.set(JSON.parse(content));
    return;
  }
  writeUserDetails('[]');
};

const signupHandler = function(users, request, response) {
  const { displayName, userName, password } = parseUserInput(request.body);
  const user = new User(displayName, userName, password);
  users.add(user);
  writeUserDetails(JSON.stringify(users.get()));
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
};

const isEqual = (value1, value2) => value1 == value2;

const isValidUser = function(users, loginDetails) {
  const isValidUserName = (userName) => isEqual(userName, loginDetails.userName);
  const isValidPassword = (password) => isEqual(password, loginDetails.password);

  const matchedUsers = users.filter(({ userName, password }) => 
    isValidUserName(userName) && isValidPassword(password));
  return matchedUsers.length == 1;
};

const loginHandler = function(users, request, response) {
  const loginDetails = parseUserInput(request.body);
  const usersDetail = users.get();
  if (isValidUser(usersDetail, loginDetails)) {
    response.setHeader('Set-Cookie', 'username=' + loginDetails.userName);
    response.writeHead(302, { Location: '/pages/todo.html' });
    response.end();
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

module.exports = {
  signupHandler,
  loadUserDetails,
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage
};
