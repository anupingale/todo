const Express = require('./express');
const { renderLoginPage, loginHandler, logoutHandler } = require('./login');
const { signupHandler } = require('./signup');
const { readData, requestHandler, readCookies } = require('./handler');
const todoHandler = require('./todoHandler');
const app = new Express();

app.use(readData);
app.use(readCookies);
app.get('/pages/login.html', renderLoginPage);
app.get('/loadTodoList', todoHandler.renderTodoList);
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.get('/logout', logoutHandler);
app.post('/addUserTodo', todoHandler.addUserTodo);
app.post('/editUserTodo', todoHandler.editUserTodo);
app.post('/deleteUserTodo', todoHandler.deleteUserTodo);
app.post('/addTodoTask', todoHandler.addTodoTask);
app.post('/editTodoTask', todoHandler.editTodoTask);
app.post('/deleteTodoTask', todoHandler.deleteTodoTask);
app.post('/toggleTaskStatus', todoHandler.toggleTaskStatus);
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
