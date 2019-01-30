const TodoList = require('./model/todoList');
const { redirect } = require('./handler');
const { parseUserInput, getUsers, getUsersTodo } = require('./util');
const { HOME_PAGE, STATUS_REDIRECTION_FOUND } = require('./constant');
const { updateUsersData, updateUsersTodoData } = require('./util');

const users = getUsers();
const usersTodo = getUsersTodo();

const isValidUser = (username, password) => {
  console.log(usersTodo);
 return users[username] && users[username].password === password;
}

const isUserExists = username => users.hasOwnProperty(username);

const addNewUserDetails = function (response, userDetails) {
  const { displayName, username, password } = userDetails
  users[username] = { displayName, password };
  usersTodo[username] = new TodoList(0, {});
  updateUsersData(users);
  updateUsersTodoData(usersTodo);
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
}

const signupHandler = function (request, response) {
  const userDetails = parseUserInput(request.body);
  if (isUserExists(userDetails.username)) {
    return redirect(response, '/pages/signup.html')
  }
  addNewUserDetails(response, userDetails);
};

module.exports = { signupHandler, isValidUser };
