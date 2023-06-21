const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rute untuk membuat pengguna baru
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
