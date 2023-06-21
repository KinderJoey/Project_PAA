import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('http://localhost:8081/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setUserName(response.data.name);
        })
        .catch((error) => {
          console.error('Error fetching user profile data:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userName ? (
        <div>
          <p>Name: {userName}</p>
          {/* Display more user information here */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
