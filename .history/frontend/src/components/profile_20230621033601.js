import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
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
  );
};

export default UserProfile;
