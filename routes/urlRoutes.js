import express from 'express';
import { createShortUrl, redirectToOriginalUrl, getTotalUrls } from '../controllers/urlController.js';

const router = express.Router();

router.get('/total',getTotalUrls)
router.post('/shorten', createShortUrl);

router.get('/:shortId', redirectToOriginalUrl); 

export default router;  