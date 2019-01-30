const TodoList = require('./model/todoList');
const Todo = require('./model/todo');
const fs = require('fs');
const {
  KEY_SEPERATOR,
  KEY_VALUE_SEPERATOR,
  USER_TODO,
  USER_DETAIL_FILE,
  ENCODING
} = require('./constant.js');

const parseUserInput = userDetails => {
  const args = {};
  const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  userDetails.split(KEY_SEPERATOR).map(splitKeyValue).forEach(assignKeyValueToArgs);
  return args;
};

const isEqual = (value1, value2) => value1 == value2;

const isListEmpty = list => list.length == 0;

const getUsers = () => JSON.parse(fs.readFileSync(USER_DETAIL_FILE, ENCODING));

const getUsersTodo = function () {
  const usersTodo = JSON.parse(fs.readFileSync(USER_TODO, ENCODING));
  const usersName = Object.keys(usersTodo);
  return parseTodoList(usersName, usersTodo);
};

const parseTodoList = function (usersName, usersTodo) {
  usersName.forEach(userName => {
    const currentUserTodoList = usersTodo[userName];
    const newTodoList = new TodoList(currentUserTodoList.id, currentUserTodoList.todoLists);
    usersTodo[userName] = parseTodo(newTodoList);
  });
  return usersTodo;
};

const parseTodo = function (newTodoList) {
  const todos = Object.keys(newTodoList.todoLists);
  todos.forEach(todo => {
    const currentTodo = newTodoList.todoLists[todo];
    newTodoList.todoLists[todo] = new Todo(
      currentTodo.title,
      currentTodo.description,
      currentTodo.tasks
    );
  });
  return newTodoList;
};


const updateUsersTodoData = (usersTodo) =>
  fs.writeFile(USER_TODO, JSON.stringify(usersTodo), err => { });

const updateUsersData = (users) =>
  fs.writeFile(USER_DETAIL_FILE, JSON.stringify(users), err => { });

module.exports = {
  parseUserInput,
  isEqual,
  isListEmpty,
  getUsers,
  getUsersTodo,
  updateUsersTodoData,
  updateUsersData
};
