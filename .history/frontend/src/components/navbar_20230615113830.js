import { useContext } from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { AuthContext } from "./../../context/AuthContext";
import { Link } from 'react-router-dom';

const navigate = useNavigate();

const handleClick = () => {
  navigate('/profile');
};

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

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
              <Navbar.Brand href="/">d<b>MOVIE</b></Navbar.Brand>
              <div>
              <Nav>
                <Nav.Link href="#trending">Trending</Nav.Link>
                <Nav.Link href="#superhero">Superhero</Nav.Link>
              </Nav>

              </div>

              <Nav className="ml-auto">
                {currentUser ? (
                  <div style={navbarRightStyle}>
                    <span className="navbarName" style={navbarNameStyle}>
                      {currentUser.displayName}
                    </span>
                  </div>
                ) : (
                  <Button variant="outline-light" className="mr-2">Login</Button>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
