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
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8081/booking/${id}`)
      .then(() => {
        console.log('Booking deleted successfully');
        fetchBookingData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (  <div className="App" style={{ backgroundColor: 'blue' }}>
      <h2>Booking Data</h2>
      <Table striped bordered hover>
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
      </Table>
    </div>
  );
};

export default History;
