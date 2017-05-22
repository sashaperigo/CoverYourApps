'use strict';

var path = require('path');
var express = require('express');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var db = require('./database/connect-db');

var app = express();

app.use(session({
  store: new pgSession({
    pgPromise: db
  }),
  secret: process.env.sessionsecret || 'local test secret',
  resave: false,
  saveUninitialized: false
}));

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
});

app.get('/api/track/:resource/:behavior', function (req, res) {
  var resource = req.params.resource;
  var behavior = req.params.behavior;
  req.session[resource] = behavior;
  res.json(req.session);
});

app.listen(8000, function () {
  console.log('Listening on port 8000!')
});
