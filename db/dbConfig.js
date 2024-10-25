// require("dotenv").config();

// const mysql2 = require("mysql2");
// const dbConnection = mysql2.createPool({
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   port:3306,
//   connectionLimit: 10,
// });

// console.log({
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
// });



// // dbConnection.execute("SELECT 'test' AS test", (err, result) => {
// //   if (err) {
// //     console.error("Database connection failed:", err.message);
// //   } else {
// //     console.log("Database connected successfully:", result);
// //   }
// // });

// module.exports = dbConnection.promise();


require("dotenv").config();
const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 3306,  // Ensure this is the correct port
  connectionLimit: 10,
  connectTimeout: 10000,  // 10 seconds
});

dbConnection.execute("SELECT 1", (err, results) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully:", results);
  }
});

module.exports = dbConnection.promise();
