import React from 'react'

function Login() {
  return (
    <div className='d-flex justify-content-center aling-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25 high-20'>
            <from action="">
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter Email' className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="email" placeholder='Enter Password'  className='form-control rounded-0'></input>
            </div>
            <button className='btn btn-success'> Log In</button>
            <p>belum punya akun?</p>
            <button className='btn btn-default border w-100' >create accont</button>
            </from>
        </div>

    </div>
  )
}

export default Login