const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

/* ── Middleware ── */
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    // Allow any localhost port in development or matched origin
    if (/^http:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

/* ── Routes ── */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/megamenu', require('./routes/megamenu'));

/* ── Health check ── */
app.get('/', (req, res) => res.json({ status: 'Apple Store API running ✅' }));

/* ── DB + Server ── */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000} 🚀`)
    );
  })
  .catch((err) => {
    console.error('DB connection failed ❌', err.message);
    process.exit(1);
  });
