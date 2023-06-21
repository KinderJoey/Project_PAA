import { useContext } from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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
              <div style={navbarRightStyle}>
                {currentUser ? (
                  <>
                    <img src={currentUser.profileImg} alt="Profile" style={profileImgStyle} />
                    <span style={navbarNameStyle}>{currentUser.name}</span>
                    <Button variant="outline-light" className="mr-2" onClick={handleClick}>Profile</Button>
                  </>
                ) : (
                  <Button variant="outline-light" className="mr-2" as={Link} to="/login">Login</Button>
                )}
              </div>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
