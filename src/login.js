const { parseUserInput } = require('./util');
const { isValidUser } = require('./signup');
const { setCookie, redirect } = require('./handler');

const loginHandler = function (request, response) {
  const loginDetails = parseUserInput(request.body);
  if (isValidUser(loginDetails.username, loginDetails.password)) {
    setCookie(response, 'username=' + loginDetails.username);
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
    redirect(response, '/pages/todo.html');
    return;
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
