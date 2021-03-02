const express = require('express');
const path = require('path');

const SERVER_PORT = process.env.SERVER_PORT || '8080';

const app = express();
const public_path = express.static(__dirname + '/public');
const index_path = __dirname + '/public/index.html';

app.use(public_path);
app.get('*', function (request, response) {
  response.sendFile(index_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});
app.listen(SERVER_PORT);
console.log("Listening at http://localhost:" + SERVER_PORT);