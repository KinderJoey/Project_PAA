const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());
const session = require('express-session');

app.use(session({
    secret: 'secretKey', // Ganti dengan kunci rahasia yang kuat
    resave: false,
    saveUninitialized: false
}));

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
        // Anda dapat menambahkan data pengguna lainnya ke dalam payload
    };

    // Gantilah 'secretKey' dengan kunci rahasia yang kuat
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    return token;
}

app.post('/signup', (req, res) => {
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
            req.session.Id = user.id; // Simpan ID pengguna dalam sesi
            const token = generateToken(user);
            return res.json({ token });
        } else {
            return res.json("gagal");
        }
    });
});

app.post('/booking', (req, res) => {
    const Id = req.session.Id; // Gantilah dengan cara yang sesuai untuk mendapatkan ID pengguna yang sedang login
    const sql = "INSERT INTO booking (moviename, name, banyakTiket, pilihKursi, id) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.moviename,
        req.body.name,
        req.body.banyakTiket,
        req.body.pilihKursi,
        Id
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
