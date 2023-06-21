import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    axios
      .get(`http://localhost:8081/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Age: {userProfile.age}</p>
    </div>
  );
};

export default UserProfile;
