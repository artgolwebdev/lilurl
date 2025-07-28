import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import lilurlService from '../services/lilurlService';

function LilUrlQRForm() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(input);
    try {
      const data = await lilurlService.generateQRcode(input);
        console.log(data);
    } catch (err) {
      setError(err.message || 'Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="">



        
      <Card className="">
        <div className="card-header">
            <h2 className='bungee-regular'>QR Code Generator</h2>
        </div>
      <Card.Body>
        <Card.Text>Paste link</Card.Text>
        <Form onSubmit={handleSubmit}>
         

        <div className="mb-3">
               <input   type="text"
              placeholder="https://example.com/your-long-url"
              className="form-control"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoComplete='off'
              required/>
        </div>

      
          <div className="d-grid gap-2 mb-2">
            <Button className='audiowide-regular' variant="primary" size="lg" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'generate QR Code'}
            </Button>
          </div>
        </Form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}


      </Card.Body>
      </Card>
    </div>
  );
}

export default LilUrlQRForm;