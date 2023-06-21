import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

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
    console.log('Edit booking with ID:', id);
    // Tambahkan logika atau permintaan HTTP untuk mengedit data booking
  };

  const handleDelete = nama => {
    axios
      .delete(`http://localhost:8081/history?nama=${nama}`)
      .then(() => {
        console.log('Booking deleted successfully');
        fetchBookingData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
<tbody>
  {bookingData.map(booking => (
    <tr key={booking.id}>
      <td>{booking.moviename}</td>
      <td>{booking.name}</td>
      <td>{booking.banyakTiket}</td>
      <td>{booking.pilihKursi}</td>
      <td>
        <Button variant="primary" onClick={() => handleEdit(booking.id)}>
          Edit
        </Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => handleDelete(booking.id)}>
          Hapus
        </Button>
      </td>
    </tr>
  ))}
</tbody>

  );
};

export default History;
