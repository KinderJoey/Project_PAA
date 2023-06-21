import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerValidation from '../Validation/SingupValidation';
import axios from 'axios';


function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(registerValidation(values));
    if(error.name === "" && error.email === "" && error.password ===""){
        axios.post('http://localhost:8081/SingUp', values)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    // Lakukan tindakan login atau pengiriman data ke backend di sini
  };
  
  // Render komponen SignUp


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action=""onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="name" placeholder='Enter Name' onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.name && <span className='text-danger'>{error.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.email && <span className='text-danger'>{error.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>
          <button className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
          <p>Sudah punya akun?</p>
          <button onClick={() => navigate('/')} className="btn btn btn-primary w-100 rounded-0">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
