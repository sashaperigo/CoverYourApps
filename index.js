'use strict';

var path = require('path');
var express = require('express');
var db = require('./database/connect-db');

var app = express();

// Runs angular app
app.use(express.static(path.join(__dirname, 'app')));

// Other API routes will go down here
app.get('/api/dbtest', function (req, res) {
  db.any('SELECT * FROM test')
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.err(err);
      res.send(error);
    });
})

app.listen(8000, function () {
  console.log('Listening on port 8000!')
});
