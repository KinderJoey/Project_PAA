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
// Endpoint untuk mendapatkan profil pengguna berdasarkan ID
app.get('/api/currentUser', (req, res) => {
    const userId = req.query.userId; // Dapatkan userId dari query parameter
  
    // Eksekusi kueri untuk mendapatkan pengguna berdasarkan userId
    const query = `SELECT * FROM  WHERE id = ${userId}`;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching user data:', error);
        res.sendStatus(500);
        return;
      }
  
      if (results.length === 0) {
        res.sendStatus(404);
        return;
      }
  
      const user = results[0];
      res.json(user);
    });
  });

  //booking tiket


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




  //log out
//   // Rute untuk logout
//   app.post('/logout', (req, res) => {
//     // Lakukan logika logout di sini (seperti menghapus sesi atau token)
//     // Misalnya, jika Anda menggunakan JWT, Anda dapat menghapus token yang disimpan di sisi server backend.
//     // Contoh: deleteTokenFromStorage(req.body.token);
  
//     res.json({ message: 'Anda telah berhasil logout' });
//   });
  
  

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
