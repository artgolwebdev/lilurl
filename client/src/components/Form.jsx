import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import lilurlService from '../services/lilurlService';
import Tilt from 'react-parallax-tilt';

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
      const newResult = { 
          originalUrl: input, 
          shortUrl: data.shortUrl , 
          metaImage : data.metaImage ,
          metaTitle : data.metaTitle , 
          metaDescription : data.metaDescription , 
          expiresAt: data.expiresAtTimestamp , 
      };

      const updatedResults = [newResult, ...results];
      setResults(updatedResults);
      localStorage.setItem('lilurl_results', JSON.stringify(updatedResults));
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    }
    setLoading(false);
  };

  const deleteShortUrl = async (e, idx) => {
    e.stopPropagation();
    const r = results[idx];
    if (window.confirm('Are you sure you want to delete this short URL?')) {
      try {
        await lilurlService.deleteShortUrl(r.shortUrl.split('/').pop());
        const updated = results.filter((item, i) => i !== idx);
        setResults(updated);
        localStorage.setItem('lilurl_results', JSON.stringify(updated));
        setToastMsg('Short URL deleted');
        setShowToast(true);
      } catch (err) {
        setToastMsg('Failed to delete URL');
        setShowToast(true);
      }
    }
  };

  return (
    <div className="">

      
        {/* Show results from localStorage */}
        {results.length > 0 && (
          <div className="mt-4 mb-4">
              {results.map((r, idx) => (
                  <Card key={idx} className='lilurl-shorten-card mb-2 glass3d'>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <a href={r.shortUrl} target="_blank" className='link-holder audiowide-regular text-seccess' rel="noopener noreferrer">{r.shortUrl}</a>  

                    {r.metaImage && 
                      <div className='img-holder'>
                        <img src={r.metaImage} alt="meta preview" 
                          style={{maxWidth:'100px', maxHeight:'60px'}} />
                      </div>
                    
                    }


                  </CardHeader>


                  <Card.Body>
                    {r.metaTitle && <p className='fs-6'>{r.metaTitle}</p>}                  
                    <p>{r.originalUrl}</p>    

                    
                        <div className="btn-group" role="group">
                          <Button type="button" variant="outline-info" size="sm" onClick={e => deleteShortUrl(e, idx)}>Delete</Button>
                          <Button type="button" variant="outline-info" size="sm" disabled="1">Share</Button>
                          <Button type="button" variant="outline-info" size="sm" disabled="1">QR Code</Button>
                          <Button
                            variant="outline-info"
                              size="xs"
                                onClick={() => {
                                  navigator.clipboard.writeText(r.shortUrl);
                                  setToastMsg('Short URL copied!');
                                  setShowToast(true);
                                }}
                              >Copy</Button>

                        </div>

                  </Card.Body>


                  <Card.Footer>

                    <div className="">
                      {r.expiresAt && <div><small className="text-muted">Expires: {new Date(r.expiresAt).toLocaleString()}</small></div>}

                    </div>                   
                  </Card.Footer>
                </Card>
              ))}
          </div>
        )}

      {/* Show form if no results from localStorage */}
        {results.length < 1 && ( 
          <Card className="glass3d">
            <div className="card-header">
              <h2 className='bungee-regular'>Shorten URL</h2>
            </div>
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

            </Card.Body>
          </Card>
        )}
        {/* Toast notification for copy */}
          <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 9999 }}>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={1500} autohide bg={toastMsg === 'Short URL deleted' ? 'warning' : 'success'}>
              <Toast.Body style={{ color: '#fff', fontWeight: 'bold' }}>{toastMsg}</Toast.Body>
            </Toast>
          </div>
    </div>
  );
}

export default LilUrlForm;