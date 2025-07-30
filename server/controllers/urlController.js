
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import fetchMeta from '../utils/fetchMeta.js';
import QRCode from 'qrcode'; // Assuming you have a QR code generation library

export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    
    // Validate the required field
    if(!originalUrl)
        return res.status(400).json({ error: 'URL is required' });

    // Validate the URL length
    if (originalUrl.length > 2048)  
        return res.status(400).json({ error: 'URL is too long' });

    // Validate the URL type
    if (typeof originalUrl !== 'string' || originalUrl.trim().length === 0)
        return res.status(400).json({ error: 'URL must be a non-empty string' });
    
    // Check for script tags or invalid characters (basic sanitation)
     if (/<[^>]*script/.test(originalUrl.toLowerCase())) 
        return res.status(400).json({ error: 'Invalid input: scripts not allowed' });
  
    // Validate the URL format
    if (!originalUrl || !/^https?:\/\//.test(originalUrl))
        return res.status(400).json({ error: 'Invalid URL' });  

    // Generate a unique short ID and save the URL
    // Ensure the shortId is unique
    
    let shortId;
    let attempts = 0;

    // Try max 5 times to avoid infinite loop
    while (attempts < 5) {
        shortId = nanoid(6);
        const existingUrl = await Url.findOne({ shortId });

        if (!existingUrl) {
        break;
        }
        attempts++;
    }

    if (attempts === 5) {
        return res.status(500).json({ error: 'Failed to generate unique short ID' });
    }
    let expiresInDays;
    let userType = 'guest';// TO DO 
    switch (userType) {
      case 'registered':
        expiresInDays = 270; // ~9 months
        break;
      case 'paid':
        expiresInDays = 36500; // ~100 years (simulate never expiring)
        break;
      case 'guest':
      default:
        expiresInDays = 7;
    }

    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

    // Fetch meta tags
    let meta = { metaTitle: '', metaDescription: '', metaImage: '' };
    try {
      meta = await fetchMeta(originalUrl);
    } catch (e) {}

    const newUrl = new Url({ shortId, originalUrl, expiresAt, ...meta });

    try {
        await newUrl.save();
        const cont = req.app.locals.cont;
        return res.status(200).json({ shortId, originalUrl, shortUrl: `${cont.BASE_URL}/${shortId}`, expiresAtTimestamp: expiresAt.getTime(), ...meta });
    } catch (error) {
        console.error('Error saving to DB:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a shortened URL by shortId
export const deleteShortUrl = async (req, res) => {
  const { shortId } = req.params;
  if (!shortId) {
    return res.status(400).json({ error: 'shortId is required' });
  }
  try {
    const deleted = await Url.findOneAndDelete({ shortId });
    if (!deleted) {
      return res.status(404).json({ error: 'URL not found' });
    }
    return res.status(200).json({ message: 'Short URL deleted', shortId });
  } catch (error) {
    console.error('Error deleting short URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
    const { shortId } = req.params;
    
    try {
        const url = await Url.findOne({ shortId });
        if (!url) {         
            return res.status(404).json({ error: 'URL not found' });
        }                     
        
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting to original URL:', error);         
        res.status(500).json({ error: 'Internal Server Error' });   
    }
};

export const getTotalUrls = async (req, res) => {
    try {
        const totalUrls = await Url.countDocuments();
        res.status(200).json({ totalUrls });
    } catch (error) {
        console.error('Error fetching total URLs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   

export const createQRCode = async (req, res) => {
     const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid URL in request body' });
    }

    try {
        const qrCodeDataURL = await QRCode.toDataURL(originalUrl);
        res.json({ qrCode: qrCodeDataURL });
    } catch (error) {
        console.error('QR code generation failed:', error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
}