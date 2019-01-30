const Express = require('./express');
const { renderLoginPage, loginHandler, logoutHandler } = require('./login');
const { getUsers, getUsersTodo } = require('./util');
const { signupHandler } = require('./signup');
const { readData, requestHandler, readCookies } = require('./handler');
const todoHandler = require('./todoHandler');
const app = new Express();

const cachedData = {
  users: getUsers(),
  usersTodo: getUsersTodo()
}

app.use(readData);
app.use(readCookies);
app.get('/pages/login.html', renderLoginPage);
app.get('/loadTodoList', todoHandler.renderTodoList.bind(null, cachedData));
app.post('/signup', signupHandler.bind(null, cachedData));
app.post('/login', loginHandler.bind(null, cachedData));
app.get('/logout', logoutHandler);
app.post('/addUserTodo', todoHandler.addUserTodo.bind(null, cachedData));
app.post('/editUserTodo', todoHandler.editUserTodo.bind(null, cachedData));
app.post('/deleteUserTodo', todoHandler.deleteUserTodo.bind(null, cachedData));
app.post('/addTodoTask', todoHandler.addTodoTask.bind(null, cachedData));
app.post('/editTodoTask', todoHandler.editTodoTask.bind(null, cachedData));
app.post('/deleteTodoTask', todoHandler.deleteTodoTask.bind(null, cachedData));
app.post('/toggleTaskStatus', todoHandler.toggleTaskStatus.bind(null, cachedData));
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
