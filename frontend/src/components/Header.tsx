// src/components/Header.tsx
import React from 'react';
import { Container, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from '../Auth';

const Header: React.FC = () => {
  const isLoggedIn = Auth();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <Container>
      <Navbar>
        <Nav>
          <NavItem>
            <NavLink href="/" className="navbar-brand">
              MovieDB
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          {!isLoggedIn ? (
            <NavItem>
              <NavLink href="/login" className="text-dark">Login</NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink href="#" onClick={handleLogout} className="text-dark">Logout</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile" className="text-dark">Profile</NavLink>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavLink href="/popular" className="text-dark">Popular Movies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/search" className="text-dark">Search Movies</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
