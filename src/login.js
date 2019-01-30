const { parseUserInput } = require('./util');
const { isValidUser } = require('./signup');
const { setCookie, redirect } = require('./handler');

const loginHandler = function (cachedData, request, response) {
  const { username, password } = parseUserInput(request.body);
  if (isValidUser(cachedData.users, username, password)) {
    setCookie(response, 'username=' + username);
    return redirect(response, '/pages/todo.html');
  }
  response.end();
};

const logoutHandler = function (request, response) {
  setCookie(response, 'username=;expires=Thu, 01-Jan-1970 00:00:00 GMT');
  response.end();
}

const renderLoginPage = function (request, response, next) {
  const cookie = request.cookies.username;
  if (cookie) {
    return redirect(response, '/pages/todo.html');
  }
  next();
};

module.exports = {
  parseUserInput,
  loginHandler,
  isValidUser,
  renderLoginPage,
  logoutHandler
};
