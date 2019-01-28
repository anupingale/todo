const Todo = require('../src/model/todo.js');
const TodoList = require('../src/model/todoList.js');
const { expect } = require('chai');

describe('Todo', () => {
  it('should add task to the Todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    expect(todo.tasks).has.property(1).to.eql({ description: 'Print documents', status: false });
  });

  it('should edit a task in Todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    todo.editTask(1, 'Write tests');
    expect(todo.tasks).has.property(1).to.eql({ description: 'Write tests', status: false });
  });

  it('should delete a task from Todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    todo.deleteTask(1);
    expect(todo.tasks).to.eql({});
  });

  it('should mark task as done in todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    todo.toggleTaskStatus(1);
    expect(todo.tasks).has.property(1).to.eql({ description: 'Print documents', status: true });
  });

  it('should mark task as not done in todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    todo.toggleTaskStatus(1);
    todo.toggleTaskStatus(1);
    expect(todo.tasks).has.property(1).to.eql({ description: 'Print documents', status: false });
  });

  it('should add multiple tasks in todo', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    todo.addTask('Write tests');
    expect(todo.tasks).has.property(1).to.eql({ description: 'Print documents', status: false });
    expect(todo.tasks).has.property(2).to.eql({ description: 'Write tests', status: false });
  });
});

describe('TodoList', () => {
  it('should add a todo in todoList', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    const userTodoList = new TodoList();
    userTodoList.addTodo(todo)
    expect(userTodoList).has.property(1).has.property('title').to.equal('Office');
    expect(userTodoList).has.property(1).has.property('description').to.equal('Office work');
  });

  it('should add multiple todo\'s in todoList', () => {
    const todo1 = new Todo('Office', 'Office work');
    const todo2 = new Todo('home', 'home work');

    todo1.addTask('Print documents');
    todo2.addTask('study');

    const userTodoList = new TodoList();
    userTodoList.addTodo(todo1)
    userTodoList.addTodo(todo2)

    expect(userTodoList).has.property(1).has.property('title').to.equal('Office');
    expect(userTodoList).has.property(1).has.property('description').to.equal('Office work');
    expect(userTodoList).has.property(2).has.property('title').to.equal('home');
    expect(userTodoList).has.property(2).has.property('description').to.equal('home work');
  });

  it('should delete a todo from todoList', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    const userTodoList = new TodoList();
    userTodoList.addTodo(todo);
    userTodoList.deleteTodo(1);
    expect(userTodoList).to.eql({});
  });

  it('should edit a todo from todoList', () => {
    const todo = new Todo('Office', 'Office work');
    todo.addTask('Print documents');
    const userTodoList = new TodoList();
    userTodoList.addTodo(todo);
    userTodoList.editTodo(1, { title: 'home', description: 'home work' });
    expect(userTodoList).has.property(1).has.property('title').to.equal('home');
    expect(userTodoList).has.property(1).has.property('description').to.equal('home work');
  });
});