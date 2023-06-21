const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRouter = require('./routes/auth');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use('/auth', authRouter);

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
