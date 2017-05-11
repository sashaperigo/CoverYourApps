'use strict';

var express = require('express');
var app = express();

app.use(express.static('app'));

app.listen(8000, function () {
  console.log('Listening on port 8000!')
});
