const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup" // Corrected the database name to "signup"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/signup', (req, res) => { // Corrected the endpoint to "/signup"
  const sql = "INSERT INTO login (name, email, password) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error executing the SQL query:', err);
      return res.json({ error: 'An error occurred' }); // Return an error response
    }
    return res.json({ success: true }); // Return a success response
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
