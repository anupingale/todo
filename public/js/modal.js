const DISPLAY_BLOCK = 'block';
const HEADER_ADD_TASK = 'Add Task';
const HEADER_EDIT_TASK = 'Edit Task';
const HEADER_ADD_TODO = 'Add Todo';
const HEADER_EDIT_TODO = 'Edit Todo Details';

const getModalHeader = document => document.getElementById('modalHeader');

const getModal = document => document.getElementById('popupBox');

const getTodoIdField = document => document.getElementById('spanTodoId');

const getTaskIdField = document => document.getElementById('spanTaskId');

const getTodoTitle = document => document.getElementById('editTitle');

const getTodoDescription = document => document.getElementById('editDescription');

const getSubmitButton = document => document.getElementById('btnSubmitModal');

const getModalCloseButton = document =>document.getElementById('btnCloseModal');

const getTodoListContainer = document => document.getElementById('todoListContainer');

const openTodoAddModal = document =>
  openModal(document, HEADER_ADD_TODO, addTodo, DISPLAY_BLOCK);

const openTodoEditModal = document =>
  openModal(document, HEADER_EDIT_TODO, editTodo, DISPLAY_BLOCK);

const openTaskAddModal = document =>
  openModal(document, HEADER_ADD_TASK, addTodoTask);

const openTaskEditModal = document =>
  openModal(document, HEADER_EDIT_TASK, editTodoTask);

const setElementValue = (element, value) => element.innerHTML = value;

const setModalView = function (document, modalHeader) {
  const taskId = getClickedButtonID(event).replace('task_edit_', EMPTY_STRING);
  const todoId = getTodoID(event);
  setElementValue(getTodoIdField(document), todoId);
  setElementValue(getTaskIdField(document), taskId);
  setElementValue(getModalHeader(document), modalHeader);
  getTodoTitle(document).style.display = DISPLAY_NONE;
  getModal(document).style.display = DISPLAY_BLOCK;
  clearTextFields(document);
};

const clearTextFields = document => {
  getTodoTitle(document).value = EMPTY_STRING;
  getTodoDescription(document).value = EMPTY_STRING;
}

const openModal = function (document, modalHeader, clickHandler, showTitle = 'none') {
  setModalView(document, modalHeader);
  getSubmitButton(document).onclick = clickHandler.bind(null, document);
  getTodoDescription(document).focus();
  if (showTitle == DISPLAY_BLOCK) {
    getTodoTitle(document).style.display = DISPLAY_BLOCK;
    getTodoTitle(document).focus();
  }
};