import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
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
                <li class="nav-item">
                    <a class="nav-link" href="<%= url %>profile">Profile</a>
                </li>
                         
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <%= userName %>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="<%= url %>profile">Profil</a>
                        <a class="dropdown-item" href="<%= url %>login/logout">Logout</a>
                    </div>
                </li>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Navigation;
