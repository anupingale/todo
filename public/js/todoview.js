const createView = (document, value, cssClass = EMPTY_STRING) => {
  const view = document.createElement('div');
  view.innerHTML = value;
  view.className = cssClass;
  return view;
};

const icon = {
  'Add Task': 'glyphicon glyphicon-plus size',
  'Edit': 'glyphicon glyphicon-pencil size',
  'Edit Todo': 'glyphicon glyphicon-pencil size',
  'Delete': 'glyphicon glyphicon-trash size',
  'Delete Todo': 'glyphicon glyphicon-trash size',
  'Done': 'glyphicon glyphicon-ok size',
  'Undone': 'glyphicon glyphicon-remove size'
}

const createButton = function (document, buttonName, id = EMPTY_STRING) {
  const button = document.createElement('span');
  button.alt = buttonName;
  button.className = icon[buttonName];
  button.id = id;
  button.onclick = operations[buttonName];
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

const createTaskButtons = function (document, statusButtonName, key) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  buttons.appendChild(createButton(document, 'Edit', 'task_edit_' + key));
  buttons.appendChild(createButton(document, 'Delete', 'task_delete_' + key));
  buttons.appendChild(createButton(document, statusButtonName, 'task_done_' + key));
  return buttons;
};

const createTaskView = function (document, task, key) {
  const taskItem = createView(document, EMPTY_STRING, 'item');
  let taskCss = 'tasks undone';
  if (task.status) {
    taskCss = 'tasks done';
  }
  const taskDescription = createView(document, task.description, taskCss);
  const { taskStatus, statusButtonName } = createTaskToggleButton(document, task.status);
  const buttons = createTaskButtons(document, statusButtonName, key);
  taskItem.appendChild(taskStatus);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(buttons);
  return taskItem;
};

const getOperations = document => {
  return {
    'Add Task': openTaskAddModal.bind(null, document),
    'Edit': openTaskEditModal.bind(null, document),
    'Delete': deleteTodoTask.bind(null, document),
    'Done': toggleTaskStatus.bind(null, document),
    'Undone': toggleTaskStatus.bind(null, document),
    'Edit Todo': openTodoEditModal.bind(null, document),
    'Delete Todo': deleteTodo.bind(null, document),
    'Add Todo': openTodoAddModal.bind(null, document)
  };
};

const operations = getOperations(document);

const createTodoButtons = function (document) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  buttons.appendChild(createButton(document, 'Add Task'));
  buttons.appendChild(createButton(document, 'Delete Todo'));
  buttons.appendChild(createButton(document, 'Edit Todo'));
  return buttons;
};

const createTitleBar = function (document, todoTitle) {
  const titleBar = createView(document, EMPTY_STRING, 'title-Bar');
  const title = createView(document, todoTitle, 'title');
  const todoButtons = createTodoButtons(document);
  titleBar.appendChild(title);
  titleBar.appendChild(todoButtons);
  return titleBar;
};

const createContainer = function (document, todo, todoId) {
  const container = document.createElement('div');
  container.className = 'todo-container';
  container.id = 'container_' + todoId;
  container.appendChild(createTitleBar(document, todo.title));
  container.appendChild(createView(document, todo.description, 'description'));
  return container;
};

const createTodoView = function (document, todo, key) {
  const container = createContainer(document, todo, key);
  const tasks = todo.tasks;
  const taskKeys = Object.keys(tasks);

  taskKeys.forEach(key => {
    const taskView = createTaskView(document, tasks[key], key);
    container.appendChild(taskView);
  });
  return container;
};

const displayTodo = function (document, todoList) {
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
  }
}