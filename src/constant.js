const ENCODING = 'UTF-8';
const PAGE_NOT_FOUND = 'Page not found';
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_REDIRECTION_FOUND = 302;
const ROOT_DIR = './public';
const LOGIN_PAGE = '/pages/login.html';
const TODO_PAGE = '/pages/todo.html';
const HOME_PAGE = '/index.html'
const SIGNUP_PAGE = '/pages/signup.html';
const USER_DETAIL_FILE = './data/userDetail.json';
const USER_TODO = './data/todoList.json';
const KEY_SEPERATOR = '&';
const KEY_VALUE_SEPERATOR = '=';
const COOKIES_SEPERATOR = ';';
const SPACE = ' ';
const PLUS_REGEXP = new RegExp(/\+/, 'g');

module.exports = {
  ENCODING,
  PAGE_NOT_FOUND,
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_REDIRECTION_FOUND,
  ROOT_DIR,
  USER_DETAIL_FILE,
  USER_TODO,
  KEY_SEPERATOR,
  KEY_VALUE_SEPERATOR,
  COOKIES_SEPERATOR,
  PLUS_REGEXP,
  SPACE,
  LOGIN_PAGE,
  TODO_PAGE,
  SIGNUP_PAGE,
  HOME_PAGE
};
