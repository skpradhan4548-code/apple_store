const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

/* ── REGISTER  POST /api/auth/register ── */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already in use.' });

    const user  = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/* ── LOGIN  POST /api/auth/login ── */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Incorrect Apple ID or password.' });

    const token = signToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

/* ── GET ME  GET /api/auth/me  (protected) ── */
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorised.' });

    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json({ user });
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
});

module.exports = router;
