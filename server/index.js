import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const cont = { BASE_URL: BASE_URL }; // Your custom object
app.locals.cont = cont;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const limiter = reateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.' 
});

app.use(limiter);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors()); // add restrictions if needed
app.use(xss()); // sanitize user input
app.use(express.json());
app.use('/', urlRoutes);
console.log("here was");
// React fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));