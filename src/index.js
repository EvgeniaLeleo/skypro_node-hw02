const http = require('http');
const showUsers = require('./modules/users');

const hostname = 'http://127.0.0.1';
const port = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, hostname);

  if (url.searchParams.has('hello')) {
    const name = url.searchParams.get('hello');

    if (name) {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'text/plain');
      res.write(`Hello, ${name}.`);
      res.end();
      return;
    }

    res.statusCode = 400;
    res.statusMessage = 'ERROR';
    res.setHeader('Content-Type', 'text/plain');
    res.write('Enter a name');
    res.end();
    return;
  }

  if (url.searchParams.has('users')) {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.write(showUsers());
    res.end();
    return;
  }

  if (url.search === '') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, World!');
    res.end();
    return;
  }

  res.statusCode = 500;
  res.statusMessage = 'ERROR';
  res.end();
});

server.listen(port, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});
