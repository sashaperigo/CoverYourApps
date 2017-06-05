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
  secret: process.env.SESSION_SECRET || 'local test secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: (process.env.NODE_ENV === 'production') // true only for production
  }
}));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

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
      res.status(500).send(error);
    });
});


// Example usage: Recording user clicked 'yes' on quiz item named 'bankofvvest'
// Post to /api/track/bankofvvest/yes
// You'll get a response that is like:
// [{"behavior":"no","count":"35"},{"behavior":"yes","count":"19"}]
// which represents how many people (not including current user) clicked each option
// Also saves the current user's choice into tracking db and into their session
app.post('/api/track/:resource/:behavior', function (req, res) {
  // Save to user's session
  if (!req.session.behaviors) req.session.behaviors = {};
  req.session.behaviors[req.params.resource] = req.params.behavior;

  // Save to db and get statistics
  var newRow = [req.params.resource, req.params.behavior];
  db.task(t => {
    return t.batch([
        t.any('SELECT behavior, COUNT(*) AS count FROM track WHERE resource = $1 GROUP BY behavior', req.params.resource),
        t.none('INSERT INTO track(resource, behavior) values($1, $2)', newRow)
    ]);
  })
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      console.error('Problem tracking resource/behavior:', newRow, '\n', err)
      res.status(500).send(err);
    });
});

app.get('/api/test-session/', function (req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.status(404).send();
    return;
  }
  res.json(req.session);
});

app.post('/api/progress/:module/:section/:page', function (req, res) {
    if (!req.session.progress) req.session.progress = {};
    req.session.progress[req.params.module] = {
        section: req.params.section,
        page: req.params.page
    };
    res.json(req.params);
});

app.get('/api/progress/:module', function (req, res) {
    var module = req.params.module;
    if (!req.session.progress) req.session.progress = {};
    if (!req.session.progress[module]) req.session.progress[module] = {
        section: 1,
        page: 1
    };
    res.json(req.session.progress[module]);
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
});
