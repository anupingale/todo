const Express = require('./express.js');
const { signupHandler, loadUserDetails, todoListHandler } = require('./signup');
const { loginHandler, renderLoginPage, insertTodo } = require('./login.js');
const { readData, requestHandler, readCookies } = require('./handler.js');
const app = new Express();
const users = new Users();

loadUserDetails(users);

app.use(readData);
app.use(readCookies);
app.get('/pages/login.html', renderLoginPage);
app.get('/loadTodoList', todoListHandler.bind(null, users));
app.post('/signup', signupHandler.bind(null, users));
app.post('/login', loginHandler.bind(null, users));
app.post('/addTodo', insertTodo);
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
