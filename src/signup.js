const { User } = require('./model/user.js');
const { parseUserInput } = require('./util.js');
const fs = require('fs');
const {
  USER_DETAIL_FILE,
  ENCODING,
  HOME_PAGE,
  STATUS_REDIRECTION_FOUND,
} = require('./constant.js');

const writeUserDetails = function(users) {
  return fs.writeFileSync(USER_DETAIL_FILE, users);
};

const loadUserDetails = function(users) {
  if (fs.existsSync(USER_DETAIL_FILE)) {
    const content = fs.readFileSync(USER_DETAIL_FILE, ENCODING);
    users.set(JSON.parse(content));
    return;
  }
  writeUserDetails('[]');
};

const signupHandler = function(users, request, response) {
  const { displayName, userName, password } = parseUserInput(request.body);
  const user = new User(displayName, userName, password);
  users.add(user);
  writeUserDetails(JSON.stringify(users.get()));
  response.writeHead(STATUS_REDIRECTION_FOUND, { Location: HOME_PAGE });
  response.end();
};

module.exports = {
  signupHandler,
  loadUserDetails
};
