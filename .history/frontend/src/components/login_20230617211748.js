import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validation from '../Validation/LoginValidation';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (error.email === '' && error.password === '') {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.token) {
            // Login berhasil, simpan token di localStorage
            localStorage.setItem('jwtToken', res.data.token);
            navigate('/Home'); // Redirect to the home page
          } else {
            alert('Invalid email or password');
          }
        })
        .catch((error) => {
          console.error('Error executing axios request:', error);
        });
    }
  };

  return (
    <div className='d-flex justify-content-end align-items-center bg-primary vh-100'>
    <div className='login-container'>
        <form action="" onSubmit={handleSubmit}>
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
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
          <p className='text-black'>belum punya akun?</p>
          <button onClick={() => navigate('/SignUp')} className="btn btn btn-primary w-100 rounded-0">SingUp</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
