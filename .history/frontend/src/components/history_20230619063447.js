import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const History = () => {
  const [bookingData, setBookingData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedBookingId, setEditedBookingId] = useState(null);
  const [editedBookingName, setEditedBookingName] = useState('');

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

  const handleEdit = (id, name) => {
    setEditMode(true);
    setEditedBookingId(id);
    setEditedBookingName(name);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8081/booking/${editedBookingId}`, { name: editedBookingName })
      .then(() => {
        console.log('Booking updated successfully');
        setEditMode(false);
        fetchBookingData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedBookingId(null);
    setEditedBookingName('');
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

  const handleChange = e => {
    setEditedBookingName(e.target.value);
  };

  return (
    <div className="App" style={{ backgroundColor: 'blue' }}>
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
              <td>
                {editMode && editedBookingId === booking.id ? (
                  <input type="text" value={editedBookingName} onChange={handleChange} />
                ) : (
                  booking.name
                )}
              </td>
              <td>{booking.banyakTiket}</td>
              <td>{booking.pilihKursi}</td>
              <td>
                {!editMode || editedBookingId !== booking.id ? (
                  <Button variant="primary" onClick={() => handleEdit(booking.id, booking.name)}>
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button variant="success" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
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
