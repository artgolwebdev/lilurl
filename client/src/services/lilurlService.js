// lilurlService.js
// Centralized service for API calls to the lilurl backend
const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:5000/api' : window.location.origin+'/api' ;
const lilurlService = {
  async shortenUrl(originalUrl) {
    const res = await fetch(`${API_BASE}/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to shorten URL');
    return data;
  },

  async deleteShortUrl(shortId) {
    const res = await fetch(`${API_BASE}/shorten/${shortId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete URL');
    return await res.json();
  },

  async generateQRcode(originalUrl) {
    const res = await fetch(`${API_BASE}/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to gereta QR code');
    return data;
  },

  async getTotalUrls() {    
    const res = await fetch(`${API_BASE}/totalLinks`);
    console.log(`${API_BASE}/totalLinks`);
    console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error('Failed to fetch total URLs');
    return data;
  }
};

export default lilurlService;
