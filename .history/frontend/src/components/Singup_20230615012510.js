import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerValidation from '../Validation/SingupValidation';


function SignUp() {
  const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action="">
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="name" placeholder='Enter Name' className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' className='form-control rounded-0' />
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
