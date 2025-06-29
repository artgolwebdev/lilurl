import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

const limiter = reateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.' 
});

app.use(limiter);
app.use(cors()); // add restrictions if needed
app.use(xss()); // sanitize user input
app.use(express.json());
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));