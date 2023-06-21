import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Navigation from './navbar'; // Import the Navigation component

const Profile = () => {
  return (
    <div>
      <Navigation /> {/* Include the Navigation component */}
      <Container className='profile_page'>
        <Row>
          <Col md={10} className="mx-auto">
            <Card>
              <Card.Body>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="5x" />
                </div>
                <Card.Title className="text-center mt-3">12@gmail.com</Card.Title>
                <Card.Text>
                  User Profile
                  <br />
                  Email: 12@gmail.com
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
