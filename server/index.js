import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import MongoStore from 'connect-mongo';
import reateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import urlRoutes from './routes/urlRoutes.js';

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

app.use(session({
  secret: process.env.SESSION_SECRET || 'a_default_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

app.use('/', urlRoutes);
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