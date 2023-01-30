import { Link } from "react-router-dom";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavbarMenu = () => {
  return (
    <Container>
      <Navbar bg='Light' expand='lg' className='navbar navbar-light bg-light'>
        <Navbar.Brand to='/'>NSE DATA</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-students'
              to='/'
            >
              Home
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-addStudents'
              to='/bank-nifty'
            >
              BANKNIFTY
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-addStudents'
              to='/nifty-50'
            >
              NIFTY
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-addStudents'
              to='/item'
            >
              NSE
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-addStudents'
              to='/pcr'
            >
              PCR
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className='nav-addStudents'
              to='/login'
            >
              ADMIN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavbarMenu;
