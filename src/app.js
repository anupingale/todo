const Express = require('./express.js');
const { signupHandler, loadUserDetails } = require('./signup');
const { loginHandler, renderLoginPage,todoListHandler, addUserTodo, editUserTodo,
deleteUserTodo, addTodoTask, editTodoTask, deleteTodoTask} = require('./login.js');
const { readData, requestHandler, readCookies } = require('./handler.js');
const app = new Express();
const { Users } = require('./model/user.js');
const users = new Users();

loadUserDetails(users);

app.use(readData);
app.use(readCookies);
app.get('/pages/login.html', renderLoginPage);
app.get('/loadTodoList', todoListHandler);
app.post('/signup', signupHandler.bind(null, users));
app.post('/login', loginHandler.bind(null, users));
app.post('/addUserTodo',addUserTodo);
app.post('/editUserTodo',editUserTodo);
app.post('/deleteUserTodo',deleteUserTodo);
app.post('/addTodoTask',addTodoTask);
app.post('/editTodoTask',editTodoTask);
app.post('/deleteTodoTask',deleteTodoTask);
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
