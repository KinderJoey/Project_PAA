import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const handleInput = (event) => {
  const { name, value } = event.target;
  setValues((prev) => ({ ...prev, [name]: value }));

  // Lakukan validasi dan perbarui state error
  setErrors((prev) => ({ ...prev, [name]: value ? '' : 'This field is required' }));
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Lakukan validasi sebelum mengirimkan permintaan ke backend
  const { moviename, name, banyakTiket, pilihKursi } = values;
  const errors = {};

  if (!moviename) {
    errors.moviename = 'Movie Name is required';
  }

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!banyakTiket) {
    errors.banyakTiket = 'Number of Tickets is required';
  }

  if (!pilihKursi) {
    errors.pilihKursi = 'Seat Selection is required';
  }

  // Perbarui state error dengan kesalahan validasi
  setErrors(errors);

  // Cek apakah tidak ada kesalahan validasi
  if (Object.keys(errors).length === 0) {
    axios.post('http://localhost:8081/booking', values)
      .then(res => {
        navigate('/Home');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  
};


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="moviename"><strong>Movie Name</strong></label>
            <input
              type="text"
              placeholder='Enter Movie Name'
              name='moviename'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.moviename && <span className='text-danger'>{error.moviename}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder='Enter Name'
              name='name'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.name && <span className='text-danger'>{error.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Berapa Tiket</strong></label>
            <input
              type="banyakTiket"
              placeholder='choise 1-20'
              name='banyakTiket'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.banyakTiket && <span className='text-danger'>{error.banyakTiket}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="pilihKursi"><strong>Pilih Kursi</strong></label>
            <input
              type="pilihKursi"
              placeholder='A 1-20'
              name='pilihKursi'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Beli Tiket</strong></button>
        </form>
      </div>
    </div>
  );
}

export default Booking