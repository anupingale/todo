const createView = (document, value, cssClass = EMPTY_STRING) => {
  const view = document.createElement('div');
  view.innerHTML = value;
  view.className = cssClass;
  return view;
};

const getNumber = value => value.replace(/\D/g, EMPTY_STRING);

const icon = {
  'Add Task': 'glyphicon glyphicon-plus size',
  'Edit': 'glyphicon glyphicon-pencil size',
  'Edit Todo': 'glyphicon glyphicon-pencil size',
  'Delete': 'glyphicon glyphicon-trash size',
  'Delete Todo': 'glyphicon glyphicon-trash size',
  'Done': 'glyphicon glyphicon-ok size',
  'Undone': 'glyphicon glyphicon-remove size'
}

const createButton = function (document, buttonName, { taskId, todoId }) {
  const button = document.createElement('span');
  button.alt = buttonName;
  button.className = icon[buttonName];
  button.onclick = operations[buttonName].bind(null, document, taskId, todoId);
  return button;
};

const createTaskToggleButton = function (document, done) {
  let taskStatus = createView(document, EMPTY_STRING);
  taskStatus.className = 'task-status task-status-yellow'
  let statusButtonName = 'Done';
  if (done) {
    taskStatus.className = 'task-status task-status-green'
    statusButtonName = 'Undone';
  }
  return { taskStatus, statusButtonName };
};

const createTaskButtons = function (document, statusButtonName, key, todoId) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  buttons.appendChild(createButton(document, 'Edit', { taskId: key, todoId }));
  buttons.appendChild(createButton(document, 'Delete', { taskId: key, todoId }));
  buttons.appendChild(createButton(document, statusButtonName, { taskId: key, todoId }));
  return buttons;
};

const createEditBox = function (document, value) {
  const textBox = document.createElement('input');
  textBox.type = 'text';
  textBox.id = 'newTaskDescription';
  textBox.autofocus = true;
  textBox.value = value;
  textBox.onkeydown = editTask;
  return textBox;
}

const openTaskEditor = function (document) {
  const taskDescriptionView = event.target.parentElement.parentElement.getElementsByClassName('tasks')[0];
  const taskDetail = taskDescriptionView.innerHTML;
  const taskTextBox = createEditBox(document, taskDetail);
  taskDescriptionView.innerHTML = EMPTY_STRING;
  taskDescriptionView.appendChild(taskTextBox)
}

const getTaskStatusCssClass = function (taskStatus) {
  let taskCss = 'tasks undone';
  if (taskStatus) {
    taskCss = 'tasks done';
  }
  return taskCss;
}

const createTaskView = function (document, task, taskId, todoId) {
  const taskItem = createView(document, EMPTY_STRING, 'item');
  const taskCss = getTaskStatusCssClass(task.status);
  const taskDescription = createView(document, task.description, taskCss);
  taskDescription.id = "taskDescription_" + taskId;
  const { taskStatus, statusButtonName } = createTaskToggleButton(document, task.status);
  const buttons = createTaskButtons(document, statusButtonName, taskId, todoId);
  taskItem.appendChild(taskStatus);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(buttons);
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
  buttons.appendChild(createButton(document, 'Add Task', { todoId }));
  buttons.appendChild(createButton(document, 'Delete Todo', { todoId }));
  buttons.appendChild(createButton(document, 'Edit Todo', { todoId }));
  return buttons;
};

const createTitleBar = function (document, todoTitle, todoId) {
  const titleBar = createView(document, EMPTY_STRING, 'title-Bar');
  const title = createView(document, todoTitle, 'title');
  const todoButtons = createTodoButtons(document, todoId);
  titleBar.appendChild(title);
  titleBar.appendChild(todoButtons);
  return titleBar;
};

const createContainer = function (document, todo, todoId) {
  const container = document.createElement('div');
  container.className = 'todo-container';
  container.id = 'container_' + todoId;
  container.appendChild(createTitleBar(document, todo.title, todoId));
  container.appendChild(createView(document, todo.description, 'description'));
  return container;
};

const createTodoView = function (document, todo, todoId) {
  const container = createContainer(document, todo, todoId);
  const tasks = todo.tasks;
  const taskKeys = Object.keys(tasks);

  taskKeys.forEach(taskId => {
    const taskView = createTaskView(document, tasks[taskId], taskId, todoId);
    container.appendChild(taskView);
  });
  return container;
};

const displayTodo = function (document, todoList) {
  setElementValue(getTodoListContainer(document), EMPTY_STRING);
  const todoListKeys = Object.keys(todoList);
  todoListKeys.forEach(key => {
    const todoContainer = createTodoView(document, todoList[key], key);
    getTodoListContainer(document).appendChild(todoContainer);
  });
};

const hideModal = function (document) {
  getModal(document).style.display = DISPLAY_NONE;
  getTodoListContainer(document).style.display = DISPLAY_FLEX;
}

window.onclick = () => {
  if (event.target == getModal(document)) {
    hideModal(document);
  }
}

window.onkeydown = () => {
  if (event.key == 'Escape') {
    hideModal(document);
    hideTaskEditor();
  }
}

const hideTaskEditor = function () {
  const taskEditor = document.getElementById('newTaskDescription');
  taskEditor.parentElement.innerHTML = taskEditor.value;
}

const editTask = function () {
  if (event.key == 'Enter') {
    const newTaskDescription = event.target;
    const description = newTaskDescription.value;
    const todoId = getTodoID(newTaskDescription);
    const taskId = getNumber(newTaskDescription.parentElement.id);
    editTodoTask({ todoId, taskId, description })
  }
}