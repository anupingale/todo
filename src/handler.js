const fs = require('fs');
const {
  PAGE_NOT_FOUND,
  STATUS_OK,
  STATUS_NOT_FOUND,
  HOME_PAGE,
  ROOT_DIR,
  COOKIES_SEPERATOR,
  KEY_VALUE_SEPERATOR,
  STATUS_REDIRECTION_FOUND
} = require('./constant.js');

const readData = function(request, response, next) {
  let content = '';
  request.on('data', data => (content = content + data));
  request.on('end', () => {
    request.body = content;
    next();
  });
};

const send = function(response, content, statusCode = STATUS_OK) {
  response.statusCode = statusCode;
  response.write(content);
  response.end();
};

const getURL = function(request) {
  let url = ROOT_DIR + request.url;
  if (request.url == '/') {
    url = ROOT_DIR + HOME_PAGE;
  }
  return url.toLowerCase();
};

const requestHandler = function(request, response) {
  const url = getURL(request);
  serveURLData(url, response);
};

const serveURLData = function(urlPath, response) {
  let statusCode = STATUS_OK;
  fs.readFile(urlPath, (error, content) => {
    if (error) {
      statusCode = STATUS_NOT_FOUND;
      content = PAGE_NOT_FOUND;
    }
    send(response, content, statusCode);
  });
};

const readCookies = function(request, response, next) {
  const cookie = request.headers.cookie;
  const cookies = {};
  if (cookie) {
    cookie.split(COOKIES_SEPERATOR).forEach(element => {
      const [name, value] = element.split(KEY_VALUE_SEPERATOR);
      cookies[name.trim()] = value.trim();
    });
  }
  request.cookies = cookies;
  next();
};

const setCookie = (response, cookie) => response.setHeader('Set-Cookie', cookie);

const redirect = function(response, url) {
  response.statusCode = STATUS_REDIRECTION_FOUND;
  response.setHeader('Location', url);
  response.end();
};

module.exports = { readData, requestHandler, readCookies, setCookie, redirect };
