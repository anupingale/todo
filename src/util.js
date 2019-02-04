const TodoList = require('./model/todoList');
const Todo = require('./model/todo');
const fs = require('fs');
const {
  USER_TODO,
  USER_DETAIL_FILE,
  ENCODING,
} = require('./constant');

const isEqual = (value1, value2) => value1 == value2;

const isListEmpty = list => list.length == 0;

const getUsers = () => {
  if (fs.existsSync(USER_DETAIL_FILE)) {
    return JSON.parse(fs.readFileSync(USER_DETAIL_FILE, ENCODING));
  }
  updateUsersData({});
  return {};
};

const getUsersTodo = function() {
  if (fs.existsSync(USER_TODO)) {
    const usersTodo = JSON.parse(fs.readFileSync(USER_TODO, ENCODING));
    const usersName = Object.keys(usersTodo);
    return parseTodoList(usersName, usersTodo);
  }
  updateUsersTodoData({});
  return {};
};

const parseTodoList = function(usersName, usersTodo) {
  usersName.forEach(userName => {
    const currentUserTodoList = usersTodo[userName];
    const newTodoList = new TodoList(currentUserTodoList.id, currentUserTodoList.todoLists);
    usersTodo[userName] = parseTodo(newTodoList);
  });
  return usersTodo;
};

const parseTodo = function(newTodoList) {
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

const updateUsersTodoData = usersTodo => fs.writeFileSync(USER_TODO, JSON.stringify(usersTodo));

const updateUsersData = users => fs.writeFileSync(USER_DETAIL_FILE, JSON.stringify(users));

module.exports = {
  isEqual,
  isListEmpty,
  getUsers,
  getUsersTodo,
  updateUsersTodoData,
  updateUsersData
};
