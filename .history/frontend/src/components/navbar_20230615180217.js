
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the user's name from the backend API
    axios.get('/api/currentUser?userId=1') // Replace '1' with the actual user ID
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []);


const Navigation = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/profile');
  };

  const navbarRightStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const profileImgStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover'
  };

  const navbarNameStyle = {
    margin: '0px 10px',
    fontWeight: 500,
    fontSize: '16px',
    textTransform: 'capitalize',
    color: 'white' // Change the color here
  };

  

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
      <div style={{ background: "rgba(0, 0, 0, 0.7)" }}>
        <div>
          <Navbar variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">d<b>MOVIE</b></Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to="/trending">Trending</Nav.Link>
                <Nav.Link as={Link} to="/superhero">Superhero</Nav.Link>
              </Nav>

            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
