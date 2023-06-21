import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfileData(userId);
  }, [userId]);

  const fetchProfileData = async (userId) => {
    try {
      const response = await fetch(`/profile/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
