import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import lilurlService from '../services/lilurlService';
import Tilt from 'react-parallax-tilt';


function LilDashboard() {
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const data = await lilurlService.getTotalUrls();
        setTotal(data.totalUrls);
      } catch (err) {
        setError('Failed to fetch total URLs');
      }
    }
    fetchTotal();
  }, []);

  useEffect(() => {
    if (total !== null) {
      let start = 0;
      const duration = 1000; // ms
      const steps = 8;
      const increment = total / steps;
      let current = 0;
      function animate() {
        current++;
        setDisplayed(Math.round(increment * current));
        if (current < steps) {
          setTimeout(animate, duration / steps);
        } else {
          setDisplayed(total);
        }
      }
      animate();
    }
  }, [total]);

  return (
    <div className="">
      {error && <div className="alert alert-danger">{error}</div>}
      {total !== null ? (
        <Tilt  tiltAngleXInitial={1} tiltAngleYInitial={-20}>
        <div className='row mb-4'>
            <div className="glass3d col-10 pt-2 mx-1 my-1 rounded">
                <h3 className='audiowide-regular rounde text-primary'>TOTAL LINKS:  <span className='audiowide-regular fs-3 text-info  '>{displayed}</span></h3>
                <p className='audiowide-regular fs-3 text-primary'></p>
            </div>
        </div>    
        </Tilt>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  ); 
}

export default LilDashboard;
