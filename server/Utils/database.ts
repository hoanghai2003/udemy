import mysql from "mysql2";

let pool = mysql.createPool({
  host: "localhost",
  database: "udemy",
  user: "root",
  password: "12345678",
});

let database = pool.promise();

export default database;
