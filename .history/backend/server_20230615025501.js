const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app =  express();
app.use(cors());
app.use(express.json()); // Added middleware to parse JSON data

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/SignUp', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred" });
        }
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});