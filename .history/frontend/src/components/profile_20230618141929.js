import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Ambil data profil pengguna dari server backend
    axios.get('/profile/1') // Ganti dengan ID pengguna yang sesuai
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.log('Terjadi kesalahan:', error);
      });
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profil Pengguna</h1>
      <p>Nama: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Tambahkan informasi profil lainnya sesuai kebutuhan */}
    </div>
  );
};

export default Profile;
