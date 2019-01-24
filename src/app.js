const Express = require('./express.js');
const fs = require('fs');
const app = new Express();
const {
  ENCODING,
  PAGE_NOT_FOUND,
  STATUS_OK,
  STATUS_NOT_FOUND,
  HOME_PAGE,
  ROOT_DIR
} = require('./constant.js');

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
  return url;
};

const requestHandler = function(request, response) {
  const url = getURL(request);
  readURLData(url, response);
};

const readURLData = function(filePath, response) {
  let statusCode = STATUS_OK;
  fs.readFile(filePath, ENCODING, (error, content) => {
    if (error) {
      statusCode = STATUS_NOT_FOUND;
      content = PAGE_NOT_FOUND;
    }
    send(response, content, statusCode);
  });
};

app.use(requestHandler);

module.exports = app.requestListener.bind(app);
