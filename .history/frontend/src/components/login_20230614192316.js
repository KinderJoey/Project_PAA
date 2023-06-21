import React from 'react'

function login() {
  return (
    <div className='d-flex justify-content-center aling-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <from action="">
            <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter Email'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="email" placeholder='Enter Password'></input>
            </div>
            <button className='btn btn-success'> Log In</button>
            <button className='btn btn-default border'>create accont</button>
            </from>
        </div>

    </div>
  )
}

export default login