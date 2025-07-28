import express from 'express';
import { createShortUrl, redirectToOriginalUrl, getTotalUrls, getUrlsForSession } from '../controllers/urlController.js';

const router = express.Router();

router.get('/total', getTotalUrls);
router.get('/my-urls', getUrlsForSession);
router.post('/shorten', createShortUrl);

/**
 *  Redirects to the original URL based on the short ID.
 */
router.get('/:shortId', redirectToOriginalUrl); 

export default router;  