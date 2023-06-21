const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Fungsi untuk menghasilkan JWT token
function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

  return token;
}

// Endpoint untuk login
app.post('/login', (req, res) => {
  // Proses autentikasi pengguna

  // Jika autentikasi berhasil, buat JWT token
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  };
  const token = generateToken(user);

  // Simpan token di cookie
  res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: true, // Hanya akan dikirimkan melalui HTTPS jika dipakai di produksi
    sameSite: 'strict', // Menjaga cookie agar hanya dikirim pada permintaan dari situs yang sama
    maxAge: 3600000, // Masa berlaku cookie (dalam milidetik)
  });

  // Kirim respons sukses
  res.json({ message: 'Login successful' });
});

// Endpoint yang membutuhkan autentikasi
app.get('/protected', (req, res) => {
  // Periksa apakah JWT token ada di cookie
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Verifikasi JWT token
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token valid, lakukan tindakan yang diizinkan
    res.json({ message: 'Protected resource accessed' });
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
