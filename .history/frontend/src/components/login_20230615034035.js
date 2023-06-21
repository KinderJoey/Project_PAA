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
    if (error.email === "" && error.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "sukses") {
            navigate('/home'); // Redirect to the home page
          } else {
            alert("no data");
          }
        })
        .catch(error => {
          console.error("Error executing axios request:", error);
        });
    }
  };
  

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
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
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log In</strong></button>
          <p>belum punya akun?</p>
          <button onClick={() => navigate('/SingUp')} className="btn btn btn-primary w-100 rounded-0">SingUp</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
