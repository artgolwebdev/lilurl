import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import LilurlBabyLogo from '../assets/lilurlbaby.png';

function LilUrlNavBar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Placeholder: page/component mounted
    console.log('LilUrlNavBar mounted');
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    console.log('Theme set to:', theme);
    if (theme === 'light') {
      // Remove 'glass3d' class from all elements with that class
      setTimeout( () => {
        document.querySelectorAll('.card.glass3d').forEach(el => el.classList.remove('glass3d'));
      });
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'light') {
      // Remove 'glass3d' class from all elements with that class
      document.querySelectorAll('.card.glass3d').forEach(el => el.classList.remove('glass3d'));
    } else {
      // Add 'glass3d' class to all cards
      document.querySelectorAll('.card').forEach(el => {
        if (!el.classList.contains('glass3d')) {
          el.classList.add('glass3d');
        }
      });
    }
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


      <h1 className='bungee-regular'>lilurl<span className='neonderthaw-regular'>.baby</span></h1>
      


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