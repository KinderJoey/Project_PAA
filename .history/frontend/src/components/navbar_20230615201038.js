import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navigation = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the user's name from the backend API
    axios
      .get('/api/currentUser?userId=1') // Replace '1' with the actual user ID
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const navbarNameStyle = {
    margin: '0 10px',
    fontWeight: 500,
    fontSize: '16px',
    textTransform: 'capitalize',
    color: 'white',
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <div style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
        <Navbar variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              d<b>MOVIE</b>
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/trending">
                Trending
              </Nav.Link>
              <Nav.Link as={Link} to="/superhero">
                Superhero
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {userName && (
                <Navbar.Text style={navbarNameStyle}>
                  Logged in as: {userName}
                </Navbar.Text>
              )}
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="profile-dropdown">
        Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/history">
          History
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/triller">
          Triller
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/logout">
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Navigation;
