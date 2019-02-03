const DISPLAY_BLOCK = 'block';
const HEADER_ADD_TASK = 'Add Task';
const HEADER_ADD_TODO = 'Add Todo';
const HEADER_EDIT_TODO = 'Edit Todo Details';

const getModalHeader = document => document.getElementById('modalHeader');

const getModal = document => document.getElementById('popupBox');

const getTodoIdField = document => document.getElementById('spanTodoId');

const getTaskIdField = document => document.getElementById('spanTaskId');

const getTodoTitle = document => document.getElementById('editTitle');

const getTodoDescription = document => document.getElementById('editDescription');

const getSubmitButton = document => document.getElementById('btnSubmitModal');

const getModalCloseButton = document => document.getElementById('btnCloseModal');

const getTodoListContainer = document => document.getElementById('todoListContainer');

const getTaskDetailEditBox = document => document.getElementById('newTaskDescription');

const openTodoAddModal = document =>
  openModal(document, HEADER_ADD_TODO, addTodo, DISPLAY_BLOCK);

const openTodoEditModal = document =>
  openModal(document, HEADER_EDIT_TODO, editTodo, DISPLAY_BLOCK);

const openTaskAddModal = document =>
  openModal(document, HEADER_ADD_TASK, addTodoTask);

const setModalView = function (document, modalHeader) {
  const taskId = getNumber(getClickedButtonID(event));
  const todoId = getTodoID(event.target);
  setElementInnerHTML(getTodoIdField(document), todoId);
  setElementInnerHTML(getTaskIdField(document), taskId);
  setElementInnerHTML(getModalHeader(document), modalHeader);
  setElementDisplayProperty(getTodoTitle(document), DISPLAY_NONE);
  setElementDisplayProperty(getModal(document), DISPLAY_BLOCK);
  clearTextFields(document);
};

const clearTextFields = document => {
  setElementValue(getTodoTitle(document), EMPTY_STRING);
  setElementValue(getTodoDescription(document), EMPTY_STRING);
}

const openModal = function (document, modalHeader, clickHandler, showTitle = DISPLAY_NONE) {
  setModalView(document, modalHeader);
  getSubmitButton(document).onclick = clickHandler.bind(null, document);
  getTodoDescription(document).focus();
  if (showTitle == DISPLAY_BLOCK) {
    setElementDisplayProperty(getTodoTitle(document), DISPLAY_BLOCK);
    setCssClassToElement(getTodoTitle(document), 'input-field');
    getTodoTitle(document).focus();
  }
};