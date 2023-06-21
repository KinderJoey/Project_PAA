const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "singup" // Update this with the correct database name
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, 'Rahasia', { expiresIn: '1h' });

  return token;
}

app.post('/SignUp', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if (data.length > 0) {
            const user = data[0];
            const token = generateToken(user);
            return res.json({ token });
        } else {
            return res.json("gagal");
        }
    });
});
app.get('/api/currentUser', (req, res) => {
    const userId = req.query.userId; // Assuming the user ID is passed as a query parameter
  
    // Fetch the user's name from the MySQL database
    const query = `SELECT name FROM users WHERE id = ?`;
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user data: ', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const userName = results[0].name;
      res.json({ name: userName });
    });
  });

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
