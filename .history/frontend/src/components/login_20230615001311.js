import React from 'react'
import { Link } from 'react-router-dom'




function Login() {
  return (
    <div className='d-flex justify-content-center aling-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <from action="">
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="email" placeholder='Enter Password'  className='form-control rounded-0'></input>
            </div>
            <button className='btn btn-success w-100 rounded-0'><strong> Log In</strong></button>
            <p>belum punya akun?</p>
            <Link to={"/singup"} className='btn btn-default border w-100 rounded-0 text-decoration-none' >create accont</button>
            </from>
        </div>

    </div>
  )
}

export default Login