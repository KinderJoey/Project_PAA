import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookingValidation from '../Validation/bookingValidation';
import axios from 'axios';

function Booking() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    moviename: '',
    name: '',
    banyakTiket: '',
    pilihKursi:''
  });

  const [error, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(bookingValidation(values));
    if (error.moviename === "" && error.name === "" && error.banyakTiket === "" && error.pilihKursi === "") {
      axios.post('http://localhost:8081/Booking', values)
        .then(res => {
            navigate('/Home')
        })
    }
    // Perform login or send data to the backend here
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