import React from 'react'

function login() {
  return (
    <div>
        <div>
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