import React, { useState } from 'react';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState({});

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

  const handleGetProfile = () => {
    // Lakukan permintaan GET ke endpoint profile dengan ID pengguna
    fetch(`http://localhost:8081/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error:', data.error);
          setProfile({});
        } else {
          setProfile(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setProfile({});
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
        <>
          <h2>Profile</h2>
          <button onClick={handleGetProfile}>Get Profile</button>
          {Object.keys(profile).length > 0 ? (
            <>
              <p>ID: {profile.id}</p>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
            </>
          ) : (
            <p>Profile not available</p>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
