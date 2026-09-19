const router = require('express').Router();
const Product = require('../models/Product');

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

const sendProducts = async (res, filter, limit = 0) => {
  let query = Product.find(filter).sort({ name: 1 });
  if (limit > 0) query = query.limit(limit);
  const products = await query;
  res.json({ products });
};

/* ── GET /api/products ── */
router.get('/', async (req, res) => {
  try {
    const filter = { active: true };

    if (req.query.category) {
      filter.category = req.query.category.trim().toLowerCase();
    }

    if (req.query.search) {
      const term = req.query.search.trim();
      if (term) {
        const safeRegex = new RegExp(escapeRegex(term), 'i');
        filter.$or = [
          { name: safeRegex },
          { tagline: safeRegex },
          { description: safeRegex },
          { category: safeRegex },
          { 'specs.value': safeRegex },
        ];
      }
    }

    const limit = parseInt(req.query.limit, 10) || 0;
    await sendProducts(res, filter, limit);
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
