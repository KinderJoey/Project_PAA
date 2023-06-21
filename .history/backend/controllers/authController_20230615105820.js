const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, 'Rahasia', { expiresIn: '1h' });

  return token;
}

function signup(req, res) {
  const { name, email, password } = req.body;
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
    // Insert new user into database
    const sql = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, hashedPassword];
    db.query(sql, values, (err) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'An error occurred' });
      }
      return res.json({ message: 'Signup successful' });
    });
  });
}

function login(req, res) {
  const { email, password } = req.body;
  // Find user by email
  const sql = 'SELECT * FROM login WHERE email = ?';
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (data.length > 0) {
      const user = data[0];
      // Compare the password
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'An error occurred' });
        }
        if (match) {
          // Generate token and store it in a cookie
          const token = generateToken(user);
          res.cookie('jwtToken', token, { httpOnly: true });
          return res.json({ token });
        } else {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
}

module.exports = {
  signup,
  login,
};
