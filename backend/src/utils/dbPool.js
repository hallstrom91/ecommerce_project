const app = require("../server.js");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECT_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

console.log();
module.exports = pool;
