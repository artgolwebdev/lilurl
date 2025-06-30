import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import LilurlBabyLogo from '../assets/lilurlbaby.png';

function MyNavBar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar className="texture-bg">
      <Container>
        <Navbar.Brand href="#">

           <img
            src={LilurlBabyLogo}
            alt="LilURL Baby Logo"
            style={{ width: '40px' }}
          />
          
        </Navbar.Brand>
        <Button
          variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
          onClick={toggleTheme}
          className="ms-auto rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40, fontSize: 22, padding: 0 }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;