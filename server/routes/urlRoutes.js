import express from 'express';
import { createShortUrl, createQRCode , redirectToOriginalUrl, getTotalUrls, deleteShortUrl } from '../controllers/urlController.js';

const router = express.Router();

router.get('/api/totalLinks', getTotalUrls)
router.post('/api/shorten', createShortUrl);
router.delete('/api/shorten/:shortId', deleteShortUrl);
router.post('/api/qr', createQRCode)
/**
 *  Redirects to the original URL based on the short ID.
 */
router.get('/:shortId', redirectToOriginalUrl); 

export default router;  