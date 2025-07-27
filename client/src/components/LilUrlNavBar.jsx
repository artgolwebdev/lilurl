import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import LilurlBabyLogo from '../assets/lilurlbaby.png';

function LilUrlNavBar() {
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

      


        <div className="lilUrlSwitch">
          <div className="form-check form-switch">
          <input 
            className={"form-check-input " + theme } 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckDefault"
            onClick={toggleTheme} />
          <label 
            className={"form-check-label " + theme } 
            htmlFor="flexSwitchCheckDefault">{theme === 'light' ? '☀️' : '🌙'}</label>
        </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default LilUrlNavBar;