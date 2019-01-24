const http = require('http');

const app = function (request, response) {
  response.write('Request received');
  response.end();
}

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT);

console.log('Server listening at port ', PORT);