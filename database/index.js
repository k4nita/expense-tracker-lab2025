const db = require('./config');
const initializeDatabase = require('./init');
const models = require('./models');

module.exports = {
  db,
  initializeDatabase,
  models
}; 