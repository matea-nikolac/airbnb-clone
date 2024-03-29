import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const PageNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Airbnb
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-nav" />
        <Navbar.Collapse id="app-nav" className="justify-content-end">
          <Nav>
            <Nav.Link to="/profile" as={Link} eventKey='1'>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
