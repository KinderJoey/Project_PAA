import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Navigation from './navbar'; // Import the Navigation component

const Profile = () => {
  return (
    <div>
      <Navigation /> {/* Include the Navigation component */}
      <Container className='profile-page'>
        <Row>
          <Col md={6} className="mx-auto">
            <Card>
              <Card.Body>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} size="5x" />
                </div>
                <Card.Title className="text-center mt-3">John Doe</Card.Title>
                <Card.Text>
                  Age: 30
                  <br />
                  Email: johndoe@example.com
                  <br />
                  Location: New York
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
