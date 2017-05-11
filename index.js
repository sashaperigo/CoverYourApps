'use strict';

var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.listen(8000, function () {
  console.log('Listening on port 8000!')
});
