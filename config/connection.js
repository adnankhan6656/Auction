const mysql = require("mysql2");
const conf = require("./env");
const logger = require("../controllers/logger")
const pool = mysql.createPool({
  host: "localhost",
  user: conf.mysql_user,
  password: conf.mysql_password,
  database: conf.mysql_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    logger.error("Error getting connection: ", err);
    return;
  }

  logger.info("Connection acquired");
  connection.release();
});

module.exports = promisePool;
