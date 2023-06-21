import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import Navigation from './navbar';

const History = () => {
  const [bookingData, setBookingData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedBookingId, setEditedBookingId] = useState(null);
  const [editedBookingName, setEditedBookingName] = useState('');
  const [editedBookingKursi, setEditedBookingKursi] = useState('');
  const [editedBookingTiket, setEditedBookingTiket] = useState('');
  const [editedBookingMovie, setEditedBookingMovie] = useState('');

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

  const handleEdit = (id, name, kursi, tiket, movie) => {
    setEditMode(true);
    setEditedBookingId(id);
    setEditedBookingName(name);
    setEditedBookingKursi(kursi);
    setEditedBookingTiket(tiket);
    setEditedBookingMovie(movie);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8081/booking/${editedBookingId}`, {
        name: editedBookingName,
        pilihKursi: editedBookingKursi,
        banyakTiket: editedBookingTiket,
        moviename: editedBookingMovie
      })
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
    setEditedBookingKursi('');
    setEditedBookingTiket('');
    setEditedBookingMovie('');
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
    const { name, value } = e.target;
    if (name === 'name') {
      setEditedBookingName(value);
    } else if (name === 'kursi') {
      setEditedBookingKursi(value);
    } else if (name === 'tiket') {
      setEditedBookingTiket(value);
    } else if (name === 'movie') {
      setEditedBookingMovie(value);
    }
  };

  return (
    <div className='laman'>
      <div className='history-container'> {/* Tambahkan class CSS untuk container */}
        <Navigation />
        <div className='history-content'>
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
                <td>
                  {editMode && editedBookingId === booking.id ? (
                    <input
                      type="text"
                      name="movie"
                      value={editedBookingMovie}
                      onChange={handleChange}
                    />
                  ) : (
                    booking.moviename
                  )}
                </td>
                <td>
                  {editMode && editedBookingId === booking.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedBookingName}
                      onChange={handleChange}
                    />
                  ) : (
                    booking.name
                  )}
                </td>
                <td>
                  {editMode && editedBookingId === booking.id ? (
                    <input
                      type="text"
                      name="tiket"
                      value={editedBookingTiket}
                      onChange={handleChange}
                    />
                  ) : (
                    booking.banyakTiket
                  )}
                </td>
                <td>
                  {editMode && editedBookingId === booking.id ? (
                    <input
                      type="text"
                      name="kursi"
                      value={editedBookingKursi}
                      onChange={handleChange}
                    />
                  ) : (
                    booking.pilihKursi
                  )}
                </td>
                <td>
                  {!editMode || editedBookingId !== booking.id ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleEdit(
                          booking.id,
                          booking.name,
                          booking.pilihKursi,
                          booking.banyakTiket,
                          booking.moviename
                        )
                      }
                    >
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
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    </div>
  );
};

export default History;
