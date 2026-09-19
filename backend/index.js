const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

/* ── Environment & Security Pre-flight Check ── */
const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET environment variable is required.');
  process.exit(1);
}

if (isProduction && JWT_SECRET === 'apple_store_secret_key_123') {
  console.error('❌ FATAL: Default JWT_SECRET cannot be used in production.');
  process.exit(1);
}

const envOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(o => o.trim()).filter(Boolean)
  : [];

const devAllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

const allowedOrigins = Array.from(new Set([...envOrigins, ...(isProduction ? [] : devAllowedOrigins)]));

const app = express();

/* ── Middleware ── */
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} blocked by CORS policy.`));
  },
  credentials: true,
}));
app.use(express.json());

/* ── Routes ── */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/megamenu', require('./routes/megamenu'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));

/* ── Health check ── */
app.get('/', (req, res) => res.json({ status: 'Apple Store API running ✅', env: process.env.NODE_ENV || 'development' }));

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

