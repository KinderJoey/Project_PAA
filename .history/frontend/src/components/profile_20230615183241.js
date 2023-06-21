import React, { useState } from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [profileData, setProfileData] = useState(null);

  const handleInputChange = event => {
    setUserId(event.target.value);
  };

  const getProfile = () => {
    fetch(`/profile/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Profil pengguna tidak ditemukan.');
        }
        return response.json();
      })
      .then(data => {
        setProfileData(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Profil Pengguna</h1>
      <div className="profile-info">
        <label htmlFor="userId">Masukkan ID Pengguna:</label>
        <input type="text" id="userId" value={userId} onChange={handleInputChange} />
        <button onClick={getProfile}>Dapatkan Profil</button>
        <div id="profileData">
          {profileData ? (
            <>
              <p><strong>Nama:</strong> {profileData.name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Alamat:</strong> {profileData.address}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
