import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/api/currentUser?userId=${userId}`);
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              {userProfile ? (
                <div>
                  <p>Name: {userProfile.name}</p>
                  <p>Email: {userProfile.email}</p>
                  <p>ID: {userProfile.id}</p>
                </div>
              ) : (
                <p>Loading profile...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
