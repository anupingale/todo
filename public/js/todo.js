const EMPTY_STRING = '';
const DISPLAY_FLEX = 'flex';
const POST_REQUSET = 'POST';
const DISPLAY_NONE = 'none';
const LOGIN_PAGE = '/pages/login.html';

const getGreetingView = document => document.getElementById('loggedInUser');

const getAddTodoButton = document => document.getElementById('btnAddTodo');

const getLogoutButton = document => document.getElementById('btnLogout');

const getTodoID = view => getNumber(view.parentElement.parentElement.parentElement.id);

const getClickedButtonID = event => event.target.id;

const sendPostRequest = data => {
  return {
    method: POST_REQUSET,
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(data)
  };
};

const getInputDetails = function (document) {
  setElementDisplayProperty(getModal(document), DISPLAY_NONE);
  setElementDisplayProperty(getTodoListContainer(document), DISPLAY_FLEX);
  const title = getTodoTitle(document).value;
  const description = getTodoDescription(document).value;
  const todoId = getTodoIdField(document).innerHTML;
  const taskId = getTaskIdField(document).innerHTML;
  return { title, description, todoId, taskId };
};

const sendFetchRequest = function (url, data) {
  fetch(url, sendPostRequest(data))
    .then(response => response.json())
    .then(data => displayTodo(document, data.userTodoList));
};

const addTodo = function (document) {
  const { title, description } = getInputDetails(document);
  sendFetchRequest('/addUserTodo', { title, description });
};

const editTodo = function (document) {
  const { todoId, title, description } = getInputDetails(document);
  sendFetchRequest('/editUserTodo', { todoId, title, description });
};

const deleteTodo = function () {
  if (confirm('Are you sure, you want to delete?')) {
    const todoId = getTodoID(event.target);
    sendFetchRequest('/deleteUserTodo', { todoId });
  }
};

const addTodoTask = function (document) {
  const { todoId, description } = getInputDetails(document);
  sendFetchRequest('/addTodoTask', { todoId, taskDescription: description });
};

const editTodoTask = function (newTaskDetail) {
  const { todoId, taskId, description } = newTaskDetail;
  sendFetchRequest('/editTodoTask', { todoId, taskId, taskDescription: description });
};

const deleteTodoTask = function (document, taskId, todoId) {
  sendFetchRequest('/deleteTodoTask', { todoId, taskId });
};

const toggleTaskStatus = function (document, taskId, todoId) {
  sendFetchRequest('/toggleTaskStatus', { todoId, taskId });
};

const loadTodo = function (document) {
  fetch('/loadTodoList')
    .then(response => {
      if (response.redirected) {
        window.location.href = LOGIN_PAGE;
        return;
      }
      return response.json()
    })
    .then(data => {
      displayUserName(document, data.user);
      displayTodo(document, data.userTodoList);
    });
};

const displayUserName = function (document, username) {
  setElementInnerHTML(getGreetingView(document), username);
};

const logout = function () {
  fetch('/logout').then(response => {
    window.location.href = response.url;
  })
};

window.onload = () => {
  loadTodo(document);
  getModalCloseButton(document).onclick = () => hideModal(document);
  getAddTodoButton(document).onclick = operations['Add Todo'];
  getLogoutButton(document).onclick = logout;
};
