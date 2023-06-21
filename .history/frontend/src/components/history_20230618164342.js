import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/history')
      .then(response => {
        setBookingData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Booking Data</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Nama</th>
            <th>Nama</th>
            <th>Banyak Tiket</th>
            <th>Kursi</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {bookingData.map(booking => (
            <tr key={booking.id}>
              <td>{booking.moviename}</td>
              <td>{booking.name}</td>
              <td>{booking.banyaKursi}</td>
              <td>{booking.pilihKursi}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
