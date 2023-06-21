const express = require('express');
const cors = require('cors');

const app = express();

// Mengizinkan semua permintaan dari asal yang berbeda
app.use(cors());
const userRoutes = require('./routes/userRoutes');

// Middleware untuk mengizinkan Express membaca data dari body dalam format JSON
app.use(express.json());

// Menggunakan rute untuk pengguna
app.use('/api', userRoutes);

// Menjalankan server
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
