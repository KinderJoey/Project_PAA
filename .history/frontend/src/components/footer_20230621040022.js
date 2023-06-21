import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <Container className="footer-container">
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
          <Col md={6} className="text-center text-md-end ">
            <h5>Contact</h5>
            <p>123 Street, City</p>
            <p>contact@example.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
