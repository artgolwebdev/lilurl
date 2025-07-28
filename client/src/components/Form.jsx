import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CardHeader from 'react-bootstrap/esm/CardHeader';

function LilUrlForm() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [results, setResults] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      const BASE_URL = (window.location.origin.includes('localhost') ? 'http://localhost:5000' : window.location.origin || 'https://lilurl.baby');
      console.log("BASE_URL : " + BASE_URL);
      try {
        const res = await fetch(`${BASE_URL}/my-urls`);
        const data = await res.json();
        if (res.ok) {
          setResults(data);
        }
      } catch (err) {
        console.error('Error fetching URLs:', err);
      }
    };
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);
    const BASE_URL = (window.location.origin.includes('localhost') ? 'http://localhost:5000' : window.location.origin || 'https://lilurl.baby');
    console.log("BASE_URL : " + BASE_URL);
    try {
      const res = await fetch(`${BASE_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: input })
      });
      const data = await res.json();
      if (res.ok && data.shortUrl) {
        setShortUrl(data.shortUrl);
        const newResult = { originalUrl: input, shortUrl: data.shortUrl, shortId: data.shortId };
        setResults([newResult, ...results]);
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="glass3d lilurl-card">

           {/* Show results from localStorage */}
        {results.length > 0 && (
          <div className="mt-4 mb-4">
            <h3 className='bungee-regular'>Your Links</h3>
              {results.map((r) => (
                <Card key={r.shortId} className='mb-2'>
                  <CardHeader>{r.originalUrl}</CardHeader>
                  <Card.Body>
                    <Card.Text>
                      <a href={`${window.location.origin}/${r.shortId}`} target="_blank" rel="noopener noreferrer">{`${window.location.origin}/${r.shortId}`}</a>
                    </Card.Text>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/${r.shortId}`);
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

        <h2 className='bungee-regular'>Shorten URL</h2>
      <Card>
      <Card.Body>
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