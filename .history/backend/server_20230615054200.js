const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(cookieParser());
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

function generateToken(user, res) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    const token = jwt.sign(payload, 'Rahasia', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });

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
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred" });
        }
        if (data.length > 0) {
            const user = data[0];
            const token = generateToken(user, res);
            return res.json({ token });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
