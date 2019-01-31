const EMPTY_STRING = '';
const GREETING_MSG = '';
const POST_REQUSET = 'POST';
const DISPLAY_NONE = 'none';
const LOGIN_PAGE = '/pages/login.html';

const getGreetingView = document => document.getElementById('loggedInUser');

const getAddTodoButton = document => document.getElementById('btnAddTodo');

const getTodoID = event =>
  event.target.parentElement.parentElement.parentElement.id.replace('container_', EMPTY_STRING);

const getClickedButtonID = event => event.target.id;

const sendPostRequest = data => {
  return { method: POST_REQUSET, body: JSON.stringify(data) };
};

const getInputDetails = function (document) {
  getModal(document).style.display = DISPLAY_NONE;
  getTodoListContainer(document).style.display = DISPLAY_BLOCK;
  const title = getTodoTitle(document).value;
  const description = getTodoDescription(document).value;
  const todoId = getTodoIdField(document).innerHTML;
  const taskId = getTaskIdField(document).innerHTML;
  return { title, description, todoId, taskId };
};

const addTodo = function (document) {
  const { title, description } = getInputDetails(document);
  fetch('/addUserTodo', sendPostRequest({ title, description }));
  loadTodo(document);
};

const editTodo = function (document) {
  const { todoId, title, description } = getInputDetails(document);
  fetch('/editUserTodo', sendPostRequest({ todoId, title, description }));
  loadTodo(document);
};

const deleteTodo = function (document) {
  const todoId = getTodoID(event);
  fetch('/deleteUserTodo', sendPostRequest({ todoId }));
  loadTodo(document);
};

const addTodoTask = function (document) {
  const { todoId, description } = getInputDetails(document);
  fetch('/addTodoTask', sendPostRequest({ todoId, taskDescription: description }));
  loadTodo(document);
};

const editTodoTask = function (document) {
  const { todoId, taskId, description } = getInputDetails(document);
  fetch('/editTodoTask', sendPostRequest({ todoId, taskId, taskDescription: description }));
  loadTodo(document);
};

const deleteTodoTask = function (document) {
  const taskId = getClickedButtonID(event).replace('task_delete_', EMPTY_STRING);
  const todoId = getTodoID(event);
  fetch('/deleteTodoTask', sendPostRequest({ todoId, taskId }));
  loadTodo(document);
};

const toggleTaskStatus = function (document) {
  const taskId = getClickedButtonID(event).replace('task_done_', EMPTY_STRING);
  const todoId = getTodoID(event);
  fetch('/toggleTaskStatus', sendPostRequest({ todoId, taskId }));
  loadTodo(document);
};

const loadTodo = function (document) {
  setElementValue(getTodoListContainer(document), EMPTY_STRING);
  fetch('/loadTodoList').then(response => response.json()).then(data => {
    if (Object.keys(data).length) {
      displayUserName(document, data.user);
      displayTodo(document, data.userTodoList);
      return;
    }
    window.location.href = LOGIN_PAGE;
  })
};

const displayUserName = function (document, username) {
  setElementValue(getGreetingView(document), GREETING_MSG + username);
}

const logout = function () {
  fetch('/logout');
  window.location.href = LOGIN_PAGE;
}

window.onload = () => {
  loadTodo(document);
  getModalCloseButton(document).onclick = () => {
    getModal(document).style.display = DISPLAY_NONE;
    getTodoListContainer(document).style.display = DISPLAY_BLOCK;
  };
  getAddTodoButton(document).onclick = operations['Add Todo'];
};
