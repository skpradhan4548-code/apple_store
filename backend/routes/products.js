const router = require('express').Router();
const Product = require('../models/Product');

const sendProducts = async (res, filter) => {
  const products = await Product.find(filter).sort({ name: 1 });
  res.json({ products });
};

/* ── GET /api/products ── */
router.get('/', async (req, res) => {
  try {
    const filter = { active: true };

    if (req.query.category) {
      filter.category = req.query.category.trim().toLowerCase();
    }

    await sendProducts(res, filter);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Unable to load products.' });
  }
});

/* ── GET /api/products/category/:category ── */
router.get('/category/:category', async (req, res) => {
  try {
    await sendProducts(res, {
      active: true,
      category: req.params.category.trim().toLowerCase(),
    });
  } catch (err) {
    console.error('Get category products error:', err);
    res.status(500).json({ message: 'Unable to load products.' });
  }
});

/* ── GET /api/products/:id ── */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      id: req.params.id,
      active: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ product });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ message: 'Unable to load product.' });
  }
});

module.exports = router;
