'use strict';

var pgp = require('pg-promise')();

var connection = process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  database: 'coveryourapps',
  user: 'cya',
  password: null
};

var db = pgp(connection);

module.exports = db;
