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
//api buat profile
app.get('/Profile', (req, res) => {
    const userId = req.params.id;
  
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = result[0];
      res.json(user);
    });
  });

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
