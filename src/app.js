const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { renderLoginPage, loginHandler, logoutHandler } = require('./login');
const { getUsers, getUsersTodo } = require('./util');
const { signupHandler } = require('./signup');
const todoHandler = require('./todoHandler');
const app = express();

const cachedData = {
  users: getUsers(),
  usersTodo: getUsersTodo()
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
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

module.exports = app;
