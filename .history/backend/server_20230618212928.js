const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware untuk mengizinkan Express membaca data dari body dalam format JSON
app.use(express.json());

// Menggunakan rute untuk pengguna
app.use('/api', userRoutes);

// Menjalankan server
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
