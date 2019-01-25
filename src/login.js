const { parseUserInput, isEqual } = require('./util.js');

const isValidUser = function (users, loginDetails) {
  const isValidUsername = (username) => isEqual(username, loginDetails.username);
  const isValidPassword = (password) => isEqual(password, loginDetails.password);

  const matchedUsers = users.filter(({ username, password }) =>
    isValidUsername(username) && isValidPassword(password));
  return matchedUsers.length == 1;
};

const loginHandler = function (users, request, response) {
  const loginDetails = parseUserInput(request.body);
  const usersDetail = users.get();
  if (isValidUser(usersDetail, loginDetails)) {
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

module.exports = {
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage
};
