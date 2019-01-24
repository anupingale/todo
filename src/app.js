const Express = require('./express.js');
const { signupHandler, loadUserDetails } = require('./signup.js');
const { readData, requestHandler } = require('./handler.js');
const app = new Express();
const { Users } = require('./model/user.js');
const users = new Users();

loadUserDetails(users);

app.use(readData);
app.post('/signup', signupHandler.bind(null, users))
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
