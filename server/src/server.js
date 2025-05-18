const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const port = 7777;

// MySQL connection to azure cloud
var conn=mysql.createConnection({host:"pgidb-server.mysql.database.azure.com", user:"pgiuser1", password:"Lockdb@2025", database:"factorymanagementsystem", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

// Test connection
conn.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Azure DB');
      app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
});

// Simple route
// app.get('/db', (req, res) => {
//   conn.query('SELECT NOW() AS time', (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Database query failed');
//     }
//     res.json(results[0]);
//   });
// });

app.get('/query', (req, res) => {
  conn.query('select * from employee', (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).send('Could not retrieve users');
    }
    res.json(results);
  });
});







