const {
  DB_SPORT_USER,
  DB_SPORT_PASSWORD,
  DB_SPORT_NAME,
  DB_SPORT_PORT,
  DB_SPORT_HOST,
} = require("./constant");

module.exports = {
  database: {
    username: DB_SPORT_USER,
    password: DB_SPORT_PASSWORD,
    database: DB_SPORT_NAME,
    port: DB_SPORT_PORT,
    host: DB_SPORT_HOST,
    dialect: "postgres",
  },
};
