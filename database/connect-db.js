'use strict';

var pgp = require('pg-promise')();

var connection = {
  host: process.env.dbhost || 'localhost',
  port: process.env.dbport || 5432,
  database: 'coveryourapps',
  user: process.env.dbuser || 'cya',
  password: process.env.dbpassword || null
};

var db = pgp(connection);

module.exports = db;
