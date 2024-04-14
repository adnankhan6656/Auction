const dotenv = require("dotenv");
dotenv.config();

const envConf = {
  port: parseInt(process.env.PORT),
  mysql_user: String(process.env.MYSQL_USER),
  mysql_password: String(process.env.MYSQL_PASSWORD),
  mysql_database: String(process.env.MYSQL_DATABASE),
  secret_key: String(process.env.SECRET_KEY),
};

module.exports = envConf;
