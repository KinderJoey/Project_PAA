import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      axios.post('http://localhost:8081/SignUp', values)
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
            <label htmlFor="name"><strong>Movie Name</strong></label>
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
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.email && <span className='text-danger'>{error.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
          <p className='text-black'>Sudah punya akun?</p>
          <button onClick={() => navigate('/')} className="btn btn btn-primary w-100 rounded-0">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Booking