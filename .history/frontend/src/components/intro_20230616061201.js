import { Col, Container, Row, Button } from "react-bootstrap"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';



const Intro = () => {
  return (
    <div className="intro">
      <Container className="text-white text-center d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <div className="title">Beli Tiketmu Sendiri</div>
            <div className="introButton mt-4 text-center">
            <a href="#superhero" class="button-57" role="button"><span class="text">Pilih Film</span><span></span></a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Intro