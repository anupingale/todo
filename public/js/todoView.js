const createView = (document, value, cssClass = EMPTY_STRING) => {
  const view = document.createElement('div');
  view.innerHTML = value;
  view.className = cssClass;
  return view;
};

const createButton = function(document, buttonName, id = EMPTY_STRING) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = buttonName;
  button.id = id;
  button.onclick = operations[buttonName];
  return button;
};

const createTaskToggleButton = function(document, done) {
  const btnTaskStatus = createView(document, EMPTY_STRING, 'task-status-red');
  let statusButtonName = 'Done';
  if (done) {
    statusButtonName = 'Undone';
    btnTaskStatus.className = 'task-status-green';
  }
  return { btnTaskStatus, statusButtonName };
};

const createTaskButtons = function(document, statusButtonName, key) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  buttons.appendChild(createButton(document, 'Edit', 'task_edit_' + key));
  buttons.appendChild(createButton(document, 'Delete', 'task_delete_' + key));
  buttons.appendChild(createButton(document, statusButtonName, 'task_done_' + key));
  return buttons;
};

const createTaskView = function(document, task, key) {
  const taskItem = createView(document, EMPTY_STRING, 'item');
  const taskDescription = createView(document, task.description, 'tasks');
  const { btnTaskStatus, statusButtonName } = createTaskToggleButton(document, task.status);
  const buttons = createTaskButtons(document, statusButtonName, key);
  taskItem.appendChild(btnTaskStatus);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(buttons);
  return taskItem;
};

const getOperations = document => {
  return {
    'Add task': openTaskAddModal.bind(null, document),
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

const createTodoButtons = function(document) {
  const buttons = createView(document, EMPTY_STRING, 'button');
  buttons.appendChild(createButton(document, 'Add task'));
  buttons.appendChild(createButton(document, 'Delete Todo'));
  buttons.appendChild(createButton(document, 'Edit Todo'));
  return buttons;
};

const createTitleBar = function(document, todoTitle) {
  const titleBar = createView(document, EMPTY_STRING, 'title-Bar');
  const title = createView(document, todoTitle, 'title');
  const todoButtons = createTodoButtons(document);
  titleBar.appendChild(title);
  titleBar.appendChild(todoButtons);
  return titleBar;
};

const createContainer = function(document, todo, todoId) {
  const container = document.createElement('div');
  container.className = 'container';
  container.id = 'container_' + todoId;
  container.appendChild(createTitleBar(document, todo.title));
  container.appendChild(createView(document, todo.description));
  return container;
};

const createTodoView = function(document, todo, key) {
  const container = createContainer(document, todo, key);
  const tasks = todo.tasks;
  const taskKeys = Object.keys(tasks);

  taskKeys.forEach(key => {
    const taskView = createTaskView(document, tasks[key], key);
    container.appendChild(taskView);
  });
  return container;
};

const displayTodo = function(document, todoList) {
  const todoListKeys = Object.keys(todoList);
  todoListKeys.forEach(key => {
    const todoContainer = createTodoView(document, todoList[key], key);
    getTodoListContainer(document).appendChild(todoContainer);
  });
};
