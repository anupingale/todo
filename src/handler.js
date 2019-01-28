const fs = require('fs');

const {
  ENCODING,
  PAGE_NOT_FOUND,
  STATUS_OK,
  STATUS_NOT_FOUND,
  HOME_PAGE,
  ROOT_DIR, 
  COOKIES_SEPERATOR,
  KEY_VALUE_SEPERATOR,
} = require('./constant.js');

const readData = function (request, response, next) {
  let content = '';
  request.on('data', data => {
    content = content + data;
  });
  request.on('end', () => {
    request.body = content;
    next();
  });
};

const send = function (response, content, statusCode) {
  response.statusCode = statusCode;
  response.write(content);
  response.end();
};

const getURL = function (request) {
  let url = ROOT_DIR + request.url;
  if (request.url == '/') {
    url = ROOT_DIR + HOME_PAGE;
  }
  return url;
};

const requestHandler = function (request, response) {
  const url = getURL(request);
  serveURLData(url, response);
};

const serveURLData = function (filePath, response) {
  let statusCode = STATUS_OK;
  fs.readFile(filePath, (error, content) => {
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

module.exports = { readData, requestHandler, readCookies };
