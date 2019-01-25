class User {
  constructor(displayName, username, password) {
    this.displayName = displayName;
    this.username = username;
    this.password = password;
  }

  addTodoLists(todoList){
    this.todoList = todoList;
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
