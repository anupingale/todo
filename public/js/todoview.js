const icon = {
  'Add Task': 'glyphicon glyphicon-plus size',
  'Edit': 'glyphicon glyphicon-pencil size',
  'Edit Todo': 'glyphicon glyphicon-pencil size',
  'Delete': 'glyphicon glyphicon-trash size',
  'Delete Todo': 'glyphicon glyphicon-trash size',
  'Done': 'glyphicon glyphicon-ok size',
  'Undone': 'glyphicon glyphicon-remove size'
};

const createButton = function (document, buttonName, { taskId, todoId }) {
  const button = document.createElement('span');
  button.alt = buttonName;
  button.className = icon[buttonName];
  button.onclick = operations[buttonName].bind(null, document, taskId, todoId);
  return button;
};

const createTaskToggleButton = function (document, done) {
  let taskStatus = createView(document, EMPTY_STRING);
  taskStatus.className = 'task-status task-status-yellow';
  let statusButtonName = 'Done';
  if (done) {
    taskStatus.className = 'task-status task-status-green';
    statusButtonName = 'Undone';
  }
  return { taskStatus, statusButtonName };
};

const createTaskButtons = function (document, statusButtonName, taskId, todoId) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  const btnEdit = createButton(document, 'Edit', { taskId, todoId });
  const btnDelete = createButton(document, 'Delete', { taskId, todoId });
  const btnToggleStatus = createButton(document, statusButtonName, { taskId, todoId });
  appendChildren(buttons, [btnEdit, btnDelete, btnToggleStatus]);
  return buttons;
};

const createEditBox = function (document, value) {
  const textBox = document.createElement('input');
  textBox.type = 'text';
  textBox.id = 'newTaskDescription';
  setElementValue(textBox, value);
  textBox.onkeydown = editTask;
  return textBox;
};

const openTaskEditor = function (document) {
  const taskDescriptionView = event.target.parentElement.parentElement.getElementsByClassName('tasks')[0];
  const taskDetail = taskDescriptionView.innerHTML;
  const taskTextBox = createEditBox(document, taskDetail);
  setElementInnerHTML(taskDescriptionView, EMPTY_STRING);
  appendChildren(taskDescriptionView, [taskTextBox]);
  taskTextBox.focus();
};

const getTaskStatusCssClass = function (taskStatus) {
  let taskCss = 'tasks undone';
  if (taskStatus) {
    taskCss = 'tasks done';
  }
  return taskCss;
};

const createTaskView = function (document, task, taskId, todoId) {
  const taskItem = createView(document, EMPTY_STRING, 'item');
  const taskCss = getTaskStatusCssClass(task.status);
  const taskDescription = createView(document, task.description, taskCss);
  taskDescription.id = 'taskDescription_' + taskId;
  const { taskStatus, statusButtonName } = createTaskToggleButton(document, task.status);
  const buttons = createTaskButtons(document, statusButtonName, taskId, todoId);
  appendChildren(taskItem, [taskStatus, taskDescription, buttons]);
  return taskItem;
};

const getOperations = document => {
  return {
    'Add Task': openTaskAddModal,
    'Edit': openTaskEditor,
    'Delete': deleteTodoTask,
    'Done': toggleTaskStatus,
    'Undone': toggleTaskStatus,
    'Edit Todo': openTodoEditModal,
    'Delete Todo': deleteTodo,
    'Add Todo': openTodoAddModal.bind(null, document)
  };
};

const operations = getOperations(document);

const createTodoButtons = function (document, todoId) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  const btnAddTask = createButton(document, 'Add Task', { todoId });
  const btnDeleteTodo = createButton(document, 'Delete Todo', { todoId });
  const btnEditTodo = createButton(document, 'Edit Todo', { todoId });
  appendChildren(buttons, [btnAddTask, btnDeleteTodo, btnEditTodo]);
  return buttons;
};

const createTitleBar = function (document, todoTitle, todoId) {
  const titleBar = createView(document, EMPTY_STRING, 'title-Bar');
  const title = createView(document, todoTitle, 'title');
  const todoButtons = createTodoButtons(document, todoId);
  appendChildren(titleBar, [title, todoButtons]);
  return titleBar;
};

const createContainer = function (document, todo, todoId) {
  const container = document.createElement('div');
  setCssClassToElement(container, 'todo-container');
  container.id = 'container_' + todoId;
  const titleView = createTitleBar(document, todo.title, todoId);
  const descriptionView = createView(document, todo.description, 'description');
  appendChildren(container, [titleView, descriptionView]);
  return container;
};

const createTodoView = function (document, todo, todoId) {
  const container = createContainer(document, todo, todoId);
  const tasks = todo.tasks;
  const taskKeys = Object.keys(tasks);

  taskKeys.forEach(taskId => {
    const taskView = createTaskView(document, tasks[taskId], taskId, todoId);
    appendChildren(container, [taskView]);
  });
  return container;
};

const displayTodo = function (document, todoList) {
  setElementInnerHTML(getTodoListContainer(document), EMPTY_STRING);
  const todoListKeys = Object.keys(todoList);
  todoListKeys.forEach(key => {
    const todoContainer = createTodoView(document, todoList[key], key);
    appendChildren(getTodoListContainer(document), [todoContainer]);
  });
};

const hideModal = function (document) {
  setElementDisplayProperty(getModal(document), DISPLAY_NONE);
};

const hideTaskEditor = function (document) {
  const taskEditor = getTaskDetailEditBox(document);
  setElementInnerHTML(taskEditor.parentElement, taskEditor.value);
};

const editTask = function () {
  if (event.key == 'Enter') {
    const newTaskDescription = event.target;
    const description = newTaskDescription.value;
    const todoId = getTodoID(newTaskDescription);
    const taskId = getNumber(newTaskDescription.parentElement.id);
    editTodoTask({ todoId, taskId, description });
  }
  
  if (event.key == 'Escape') {
    hideTaskEditor(document);
  }
};

window.onkeydown = () => {
  if (event.key == 'Escape') {
    hideModal(document);
  }
};