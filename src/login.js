const { isValidUser } = require('./signup');
const { LOGIN_PAGE, TODO_PAGE } = require('./constant');

const loginHandler = function (cachedData, request, response) {
  const { username, password } = request.body;
  if (isValidUser(cachedData.users, username, password)) {
    response.cookie('username', username);
    return response.redirect(TODO_PAGE);
  }
  response.redirect(LOGIN_PAGE);
};

const logoutHandler = function (request, response) {
  response.clearCookie('username');
  response.redirect(LOGIN_PAGE);
}

const renderLoginPage = function (request, response, next) {
  const username = request.cookies.username;
  if (username) {
    return response.redirect(TODO_PAGE);
  }
  next();
};

module.exports = {
  loginHandler,
  isValidUser,
  renderLoginPage,
  logoutHandler
};
