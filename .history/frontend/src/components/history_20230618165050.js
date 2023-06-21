import React, { useEffect, useState } from 'react';
import axios from 'axios';
= // Import file CSS terpisah

const History = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = () => {
    axios
      .get('http://localhost:8081/history')
      .then(response => {
        setBookingData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleEdit = id => {
    // Aksi yang dilakukan saat tombol "Edit" ditekan
    // Misalnya, navigasi ke halaman edit dengan ID booking
    console.log('Edit booking with ID:', id);
  };

  const handleDelete = id => {
    // Aksi yang dilakukan saat tombol "Hapus" ditekan
    // Misalnya, mengirim permintaan DELETE ke endpoint deleteBooking
    axios
      .delete(`http://localhost:8081/booking/${id}`)
      .then(() => {
        console.log('Booking deleted successfully');
        fetchBookingData(); // Memperbarui data booking setelah penghapusan berhasil
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="history-container"> {/* Tambahkan kelas CSS untuk wadah */}
      <h2>Booking Data</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Nama</th>
            <th>Nama</th>
            <th>Banyak Tiket</th>
            <th>Kursi</th>
            <th>Edit</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map(booking => (
            <tr key={booking.id}>
              <td>{booking.moviename}</td>
              <td>{booking.name}</td>
              <td>{booking.banyakTiket}</td>
              <td>{booking.pilihKursi}</td>
              <td>
                <button onClick={() => handleEdit(booking.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(booking.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
