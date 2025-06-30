import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);
    try {
      const res = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: input })
      });
      const data = await res.json();
      if (res.ok && data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
        console.error('Error:', err);
      setError('Server error. Try again later.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          Paste your long link to create "lil" version of it.
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
              {loading ? 'Loading...' : 'Create lilurl.baby short link'}
            </Button>
          </div>
        </Form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {shortUrl && (
          <Card className="mt-3">
            <Card.Body className="d-flex align-items-center">
              <Form.Control
                type="text"
                value={shortUrl}
                readOnly
                className="me-2"
                style={{ maxWidth: 300 }}
              />
              <Button variant="outline-secondary" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}

export default LilUrlForm;