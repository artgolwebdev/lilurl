import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
        // Save to localStorage
        const newResult = { originalUrl: input, shortUrl: data.shortUrl };
        const updatedResults = [newResult, ...results];
        setResults(updatedResults);
        localStorage.setItem('lilurl_results', JSON.stringify(updatedResults));
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
    setLoading(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          Paste your long link.
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Original URL"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter link here"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoComplete='off'
              required
            />
          </FloatingLabel>
          <div className="d-grid gap-2 mb-2">
            <Button variant="primary" size="lg" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Shorten URL'}
            </Button>
          </div>
        </Form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}

        {/* Show results from localStorage */}
        {results.length > 0 && (
          <div className="mt-4">
            <h5>Your Links</h5>
            <div className="d-flex flex-wrap gap-3">
              {results.map((r, idx) => (
                <Card key={idx} style={{ minWidth: 250, maxWidth: 350 }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{r.originalUrl}</Card.Title>
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
          </div>
        )}
        {/* Toast notification for copy */}
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={1200} autohide bg="success">
            <Toast.Body style={{ color: '#fff', fontWeight: 'bold' }}>{toastMsg}</Toast.Body>
          </Toast>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LilUrlForm;