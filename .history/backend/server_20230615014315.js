const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app =  express();
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"singup"
})

app.post('/singup', (req, res) => {
    const sql = "INSERT INTO login ('name','email','password') VALUES (?)";
})


app.listen(8081,()=>{
    console.log("listerning");
})