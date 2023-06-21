import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const[values, setValue] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (event) =>{
    event.prevenDefault();

  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log In</strong></button>
          <p>belum punya akun?</p>
          <button onClick={() => navigate('/SingUp')} className="btn btn btn-primary w-100 rounded-0">SingUp</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
