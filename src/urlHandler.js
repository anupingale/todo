const { TODO_PAGE, LOGIN_PAGE } = require('./constant')
const restrictedURLWhenLoggedIn = ['/pages/login.html', '/pages/signup.html', '/index.html', '/'];

const restrictedURLWhenNotLoggedIn = [
  '/loadTodoList',
  '/addUserTodo',
  '/editUserTodo',
  '/deleteUserTodo',
  '/addTodoTask',
  '/editTodoTask',
  '/deleteTodoTask',
  '/toggleTaskStatus',
  '/pages/todo.html',
  '/css/modal.css',
  '/css/todo.css',
  '/images/todoicon.jpg',
  '/js/modal.js',
  '/js/todo.js',
  '/js/todoview.js',
  '/js/util.js',
  '/pages/todo.html'
];

const redirectURL = function(request, response, next) {
  const userAlreadyLoggedIn = request.cookies.username;
  if (restrictedURLWhenLoggedIn.includes(request.url)) {
    if (userAlreadyLoggedIn) {
      response.redirect(TODO_PAGE);
      return;
    }
  }
  if (restrictedURLWhenNotLoggedIn.includes(request.url)) {
    if (!userAlreadyLoggedIn) {
      response.redirect(LOGIN_PAGE);
      return;
    }
  }
  next();
};

module.exports = redirectURL;
