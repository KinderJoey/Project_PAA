import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingTable = () => {
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
              <td>{booking.id}</td>
              <td>{booking.name}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
