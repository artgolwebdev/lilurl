import { nanoid } from 'nanoid';
import Url from '../models/Url.js';


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

    /* 
    *  Generate a unique short ID and save the URL
    *  Ensure the shortId is unique 
    */
    
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

    const newUrl = new Url({ shortId, originalUrl, expiresAt, sessionId: req.session.id });

    try {
        await newUrl.save();
        const cont = req.app.locals.cont;
        return res.status(200).json({ shortId, originalUrl , shortUrl: `${cont.BASE_URL}/${shortId}` , expiresAtTimestamp: expiresAt.getTime() });
    } catch (error) {
        console.error('Error saving to DB:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }      
};

export const redirectToOriginalUrl = async (req, res) => {
    const { shortId } = req.params;

    console.log(shortId);
    
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
