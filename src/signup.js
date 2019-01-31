const TodoList = require('./model/todoList');
const { setCookie,redirect } = require('./handler');
const { parseUserInput } = require('./util');
const { TODO_PAGE, SIGNUP_PAGE } = require('./constant');
const { updateUsersData, updateUsersTodoData } = require('./util');

const isValidUser = (users, username, password) =>
  users[username] && users[username].password === password;

const isUserExists = (users, username) => users.hasOwnProperty(username);

const addNewUserDetails = function (cachedData, response, userDetails) {
  const { displayName, username, password } = userDetails
  cachedData.users[username] = { displayName, password };
  cachedData.usersTodo[username] = new TodoList(0, {});
  updateUsersData(cachedData.users);
  updateUsersTodoData(cachedData.usersTodo);
  setCookie(response, 'username=' + username);
  return redirect(response, TODO_PAGE);
}

const signupHandler = function (cachedData, request, response) {
  const userDetails = parseUserInput(request.body);
  if (isUserExists(cachedData.users, userDetails.username)) {
    return redirect(response, SIGNUP_PAGE);
  }
  addNewUserDetails(cachedData, response, userDetails);
};

module.exports = { signupHandler, isValidUser };
