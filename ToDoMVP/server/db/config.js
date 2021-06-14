const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS todosTable (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      todos VARCHAR(255)  NOT NULL ,
      completed BOOLEAN default false
    );`)
    .error(err => {
      console.log(err);
    });
};