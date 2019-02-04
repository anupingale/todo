const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redirectURL = require('./urlHandler');
const { loginHandler, logoutHandler } = require('./login');
const { getUsers, getUsersTodo } = require('./util');
const { signupHandler } = require('./signup');
const todoHandler = require('./todoHandler');
const app = express();

const cachedData = {
  users: getUsers(),
  usersTodo: getUsersTodo()
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(redirectURL);

app.post('/signup', signupHandler.bind(null, cachedData));
app.post('/login', loginHandler.bind(null, cachedData));
app.get('/logout', logoutHandler);
app.get('/loadTodoList', todoHandler.renderTodoList.bind(null, cachedData));
app.post('/addUserTodo', todoHandler.addUserTodo.bind(null, cachedData));
app.post('/editUserTodo', todoHandler.editUserTodo.bind(null, cachedData));
app.post('/deleteUserTodo', todoHandler.deleteUserTodo.bind(null, cachedData));
app.post('/addTodoTask', todoHandler.addTodoTask.bind(null, cachedData));
app.post('/editTodoTask', todoHandler.editTodoTask.bind(null, cachedData));
app.post('/deleteTodoTask', todoHandler.deleteTodoTask.bind(null, cachedData));
app.post('/toggleTaskStatus', todoHandler.toggleTaskStatus.bind(null, cachedData));

app.use(express.static('public'));
module.exports = app;
