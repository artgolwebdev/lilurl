import express from 'express';
import { createShortUrl, createQRCode , redirectToOriginalUrl, getTotalUrls } from '../controllers/urlController.js';

const router = express.Router();

console.log("test");

router.get('/api/totalLinks', getTotalUrls)
router.post('/api/shorten', createShortUrl);
router.post('/api/qr', createQRCode)
/**
 *  Redirects to the original URL based on the short ID.
 */
router.get('/:shortId', redirectToOriginalUrl); 

export default router;  