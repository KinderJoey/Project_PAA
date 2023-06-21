const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./models/User');
const sequelize = new Sequelize('singup', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

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

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
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

app.post('/booking', (req, res) => {
  const sql = "INSERT INTO booking (moviename, name, banyakTiket, pilihKursi) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.moviename,
    req.body.name,
    req.body.banyakTiket,
    req.body.pilihKursi
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

app.get('/history', (req, res) => {
  const sql = 'SELECT * FROM booking';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    res.json(results);
  });
});
app.delete('/booking/:booking_id', (req, res) => {
    const bookingId = req.params.booking_id;
  
    const sql = 'DELETE FROM booking WHERE id_booking = ?';
    db.query(sql, [bookingId], (error, result) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      return res.json({ message: 'Data deleted successfully' });
    });
  });
  
  



// app.get('/api/currentUser', (req, res) => {
//     const userId = req.query.userId; // Dapatkan userId dari query parameter
  
//     // Eksekusi kueri untuk mendapatkan pengguna berdasarkan userId
//     const query = `SELECT * FROM login WHERE id = ${userId}`;
  
//     db.query(query, (error, results) => {
//       if (error) {
//         console.error('Error fetching user data:', error);
//         res.sendStatus(500);
//         return;
//       }
  
//       if (results.length === 0) {
//         res.sendStatus(404);
//         return;
//       }
  
//       const user = results[0];
//       res.json(user);
//     });
//   });







  

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
