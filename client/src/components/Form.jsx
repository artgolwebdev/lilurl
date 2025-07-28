import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import lilurlService from '../services/lilurlService';

function LilUrlForm() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [results, setResults] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lilurl_results');
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);
    try {
      const data = await lilurlService.shortenUrl(input);
      setShortUrl(data.shortUrl);
      // Save to localStorage
      const newResult = { originalUrl: input, shortUrl: data.shortUrl };
      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      localStorage.setItem('lilurl_results', JSON.stringify(updatedResults));
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    }
    setLoading(false);
  };

  return (
    <div className="">

      <Card className="">
        <div className="card-header">
          <h2 className='bungee-regular'>Shorten URL</h2>
        </div>
      <Card.Body>


            {/* Show results from localStorage */}
        {results.length > 0 && (
          <div className="mt-4 mb-4">
              {results.map((r, idx) => (
                <Card key={idx} className='mb-2'>
                  <CardHeader>{r.originalUrl}</CardHeader>
                  <Card.Body>
                    <Card.Text>
                      <a href={r.shortUrl} target="_blank" rel="noopener noreferrer">{r.shortUrl}</a>
                    </Card.Text>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(r.shortUrl);
                        setToastMsg('Short URL copied!');
                        setShowToast(true);
                      }}
                    >
                      Copy
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        )}


        <Card.Text>Paste long link</Card.Text>
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
              {loading ? 'Loading...' : 'get link for free'}
            </Button>
          </div>
        </Form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}

   
        {/* Toast notification for copy */}
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={1200} autohide bg="success">
            <Toast.Body style={{ color: '#fff', fontWeight: 'bold' }}>{toastMsg}</Toast.Body>
          </Toast>
        </div>
      </Card.Body>
      </Card>
    </div>
  );
}

export default LilUrlForm;