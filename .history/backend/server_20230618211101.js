const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi ke database MySQL menggunakan Sequelize
const sequelize = new Sequelize('singup', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definisikan model User yang akan merepresentasikan tabel "login" dalam database
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'user',
  tableName: 'login', // Nama tabel dalam database
});

// Fungsi untuk menghasilkan token JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, 'Rahasia', { expiresIn: '1h' });

  return token;
}

// Endpoint untuk mendaftar pengguna baru
app.post('/SignUp', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Membuat data pengguna baru menggunakan model User
    const user = await User.create({ name, email, password });

    return res.json(user);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint untuk melakukan otentikasi pengguna
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mencari pengguna berdasarkan email dan password menggunakan model User
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      const token = generateToken(user);
      return res.json({ token });
    } else {
      return res.json("gagal");
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint untuk membuat pemesanan tiket
app.post('/booking', async (req, res) => {
  try {
    const { moviename, name, banyakTiket, pilihKursi } = req.body;

    // Membuat data pemesanan tiket baru menggunakan model Booking
    const booking = await Booking.create({ moviename, name, banyakTiket, pilihKursi });

    return res.json(booking);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint untuk mendapatkan daftar riwayat pemesanan tiket
app.get('/history', async (req, res) => {
  try {
    // Mengambil semua data pemesanan tiket dari tabel Booking
    const bookings = await Booking.findAll();

    return res.json(bookings);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Sinkronisasi model dengan database dan jalankan server
sequelize.sync().then(() => {
  app.listen(8081, () => {
    console.log("Listening on port 8081");
  });
});
