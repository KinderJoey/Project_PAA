import React, { useState } from 'react';
import UserProfile from './UserProfile';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = () => {
    // Lakukan permintaan POST ke endpoint login di backend
    fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
          setUserId(data.userId);
        } else {
          setToken('');
          setUserId('');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setToken('');
        setUserId('');
      });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>

      {token && (
        <UserProfile userId={userId} />
      )}
    </div>
  );
}

export default App;
