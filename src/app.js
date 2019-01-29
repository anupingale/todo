const Express = require('./express');
const { renderLoginPage, renderTodoList, loginHandler } = require('./login');
const { Users } = require('./model/user');
const { signupHandler, loadUserDetails } = require('./signup');
const { readData, requestHandler, readCookies } = require('./handler');
const todoHandler = require('./todoHandler');
const app = new Express();
const users = new Users();

loadUserDetails(users);
app.use(readData);
app.use(readCookies);
app.get('/pages/login.html', renderLoginPage);
app.get('/loadTodoList', renderTodoList);
app.post('/signup', signupHandler.bind(null, users));
app.post('/login', loginHandler.bind(null, users));
app.post('/addUserTodo', todoHandler.addUserTodo);
app.post('/editUserTodo', todoHandler.editUserTodo);
app.post('/deleteUserTodo', todoHandler.deleteUserTodo);
app.post('/addTodoTask', todoHandler.addTodoTask);
app.post('/editTodoTask', todoHandler.editTodoTask);
app.post('/deleteTodoTask', todoHandler.deleteTodoTask);
app.post('/toggleTaskStatus', todoHandler.toggleTaskStatus);
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
