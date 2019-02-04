const {
  COOKIES_SEPERATOR,
  KEY_VALUE_SEPERATOR,
} = require('./constant');

// const readData = function(request, response, next) {
//   let content = '';
//   request.on('data', data => (content = content + data));
//   request.on('end', () => {
//     request.body = content;
//     next();
//   });
// };

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

module.exports = {  readCookies };
