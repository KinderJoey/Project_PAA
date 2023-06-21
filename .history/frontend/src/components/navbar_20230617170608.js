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
  const handleLogout = () => {
    axios
      .get('/logout')
      .then((response) => {
        console.log(response.data);
        // Perform logout actions on the backend
        axios
          .post('/api/logout') // Assuming you have a logout endpoint
          .then((response) => {
            console.log(response.data);
            // Perform actions after successful logout, such as clearing session data on the frontend
            // Clear JWT token from cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Redirect to the login page
            window.location.href = '/logout';
          })
          .catch((error) => {
            console.error('Error during logout:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching logout URL:', error);
      });
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
              <Nav.Link as={Link} to="#trending">
                Trending
              </Nav.Link>
              <Nav.Link as={Link} to="#superhero">
                New Movie
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {userName && (
                <Navbar.Text style={navbarNameStyle}>
                  Logged in as: {userName}
                </Navbar.Text>
              )}
              <NavDropdown title="Profile" id="profile-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/history">
                  History
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/triller">
                  Triller
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout" onClick={handleLogout}>
                  Log out
               </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
    
  );
};

export default Navigation;
