class User {
  constructor(displayName, userName, password) {
    this.displayName = displayName;
    this.userName = userName;
    this.password = password;
  }
}

class Users {
  constructor() {
    this.users = [];
  }
  get() {
    return this.users;
  }
  set(users) {
    this.users = users;
  }
  add(userDetail) {
    this.users.push(userDetail);
  }
}

module.exports = { User, Users };
