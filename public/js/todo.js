const EMPTY_STRING = '';
const DISPLAY_FLEX = 'flex';
const GREETING_MSG = '';
const POST_REQUSET = 'POST';
const DISPLAY_NONE = 'none';
const LOGIN_PAGE = '/pages/login.html';

const getGreetingView = document => document.getElementById('loggedInUser');

const getAddTodoButton = document => document.getElementById('btnAddTodo');

const getTodoID = view =>
  view.parentElement.parentElement.parentElement.id.replace('container_', EMPTY_STRING);

const getClickedButtonID = event => event.target.id;

const sendPostRequest = data => {
  return { method: POST_REQUSET, body: JSON.stringify(data) };
};

const getInputDetails = function (document) {
  getModal(document).style.display = DISPLAY_NONE;
  getTodoListContainer(document).style.display = DISPLAY_FLEX;
  const title = getTodoTitle(document).value;
  const description = getTodoDescription(document).value;
  const todoId = getTodoIdField(document).innerHTML;
  const taskId = getTaskIdField(document).innerHTML;
  return { title, description, todoId, taskId };
};

const sendFetchRequest = function (url, data) {
  fetch(url, sendPostRequest(data)).then(response => response.json())
    .then(data => displayTodo(document, data.userTodoList));
}

const addTodo = function (document) {
  const { title, description } = getInputDetails(document);
  sendFetchRequest('/addUserTodo', { title, description });
};

const editTodo = function (document) {
  const { todoId, title, description } = getInputDetails(document);
  sendFetchRequest('/editUserTodo', { todoId, title, description })
};

const deleteTodo = function (document) {
  if (confirm('Are you sure, you want to delete?')) {
    const todoId = getTodoID(event.target);
    sendFetchRequest('/deleteUserTodo', { todoId })
  }
};

const addTodoTask = function (document) {
  const { todoId, description } = getInputDetails(document);
  sendFetchRequest('/addTodoTask', { todoId, taskDescription: description })
};

const editTodoTask = function (newTaskDetail) {
  const { todoId, taskId, description } = newTaskDetail;
  sendFetchRequest('/editTodoTask', { todoId, taskId, taskDescription: description })
};

const deleteTodoTask = function (document, taskId, todoId) {
  sendFetchRequest('/deleteTodoTask', { todoId, taskId })
};

const toggleTaskStatus = function (document, taskId, todoId) {
  sendFetchRequest('/toggleTaskStatus', { todoId, taskId })
};

const loadTodo = function (document) {
  fetch('/loadTodoList').then(response => response.json()).then(data => {
    if (Object.keys(data).length) {
      displayUserName(document, data.user);
      displayTodo(document, data.userTodoList);
      return;
    }
    window.location.href = LOGIN_PAGE;
  });
};

const displayUserName = function (document, username) {
  setElementValue(getGreetingView(document), GREETING_MSG + username);
};

const logout = function () {
  fetch('/logout');
  window.location.href = LOGIN_PAGE;
};

window.onload = () => {
  loadTodo(document);
  getModalCloseButton(document).onclick = () => {
    getModal(document).style.display = DISPLAY_NONE;
    getTodoListContainer(document).style.display = DISPLAY_FLEX;
  };
  getAddTodoButton(document).onclick = operations['Add Todo'];
};
