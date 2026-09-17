const router = require('express').Router();
const Product = require('../models/Product');

/**
 * Static category configurations for non-hardware services
 */
const SERVICE_MENUS = {
  store: {
    columns: [
      {
        title: 'Shop',
        featured: true,
        items: [
          { label: 'Shop the Latest', path: '/' },
          { label: 'Mac', path: '/mac' },
          { label: 'iPad', path: '/ipad' },
          { label: 'iPhone', path: '/iphone' },
          { label: 'Apple Watch', path: '/watch' },
          { label: 'AirPods', path: '/airpods' },
        ],
      },
      {
        title: 'Quick Links',
        items: [
          { label: 'Find a Store', path: '/' },
          { label: 'Order Status', path: '/cart' },
          { label: 'Apple Trade In', path: '/' },
        ],
      },
      {
        title: 'Shop Special Stores',
        items: [
          { label: 'Certified Refurbished', path: '/' },
          { label: 'Education', path: '/' },
          { label: 'Business', path: '/' },
        ],
      },
    ],
  },
  'tv-home': {
    columns: [
      {
        title: 'Explore TV & Home',
        featured: true,
        items: [
          { label: 'Explore TV & Home', path: '/tv-home' },
          { label: 'Apple TV 4K', path: '/tv-home' },
          { label: 'HomePod', path: '/tv-home' },
          { label: 'HomePod mini', path: '/tv-home' },
        ],
      },
      {
        title: 'Shop TV & Home',
        items: [
          { label: 'Shop Apple TV 4K', path: '/tv-home' },
          { label: 'Shop HomePod', path: '/tv-home' },
        ],
      },
      {
        title: 'More from TV & Home',
        items: [
          { label: 'Apple TV Support', path: '/' },
          { label: 'Apple TV+', path: '/' },
          { label: 'Home app', path: '/' },
        ],
      },
    ],
  },
  entertainment: {
    columns: [
      {
        title: 'Explore Entertainment',
        featured: true,
        items: [
          { label: 'Apple One', path: '/entertainment' },
          { label: 'Apple TV+', path: '/entertainment' },
          { label: 'Apple Music', path: '/entertainment' },
          { label: 'Apple Arcade', path: '/entertainment' },
          { label: 'Apple Podcasts', path: '/entertainment' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: 'Apple TV+ Support', path: '/' },
          { label: 'Apple Music Support', path: '/' },
        ],
      },
    ],
  },
  accessories: {
    columns: [
      {
        title: 'Shop Accessories',
        featured: true,
        items: [
          { label: 'Shop All Accessories', path: '/' },
          { label: 'Mac Accessories', path: '/mac' },
          { label: 'iPad Accessories', path: '/ipad' },
          { label: 'iPhone Accessories', path: '/iphone' },
          { label: 'Watch Accessories', path: '/watch' },
        ],
      },
      {
        title: 'Explore',
        items: [
          { label: 'Made by Apple', path: '/' },
          { label: 'AirTag', path: '/' },
        ],
      },
    ],
  },
  support: {
    columns: [
      {
        title: 'Explore Support',
        featured: true,
        items: [
          { label: 'iPhone Support', path: '/iphone' },
          { label: 'Mac Support', path: '/mac' },
          { label: 'iPad Support', path: '/ipad' },
          { label: 'Watch Support', path: '/watch' },
          { label: 'AirPods Support', path: '/airpods' },
        ],
      },
      {
        title: 'Get Help',
        items: [
          { label: 'Check Coverage', path: '/' },
          { label: 'Repair & Service', path: '/' },
          { label: 'Contact Us', path: '/' },
        ],
      },
    ],
  },
};

/**
 * Reusable helper: Builds a 3-column menu for hardware categories using DB products
 */
const buildHardwareCategory = (categoryKey, categoryName, products) => {
  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === categoryKey.toLowerCase()
  );

  return {
    columns: [
      {
        title: `Explore ${categoryName}`,
        featured: true,
        items: [
          { label: `Explore All ${categoryName}`, path: `/${categoryKey}` },
          ...categoryProducts.map((p) => ({
            label: p.name,
            path: `/product/${p.id}`,
            badge: p.tag || undefined,
          })),
        ],
      },
      {
        title: `Shop ${categoryName}`,
        items: [
          { label: `Shop ${categoryName}`, path: `/${categoryKey}` },
          { label: `${categoryName} Accessories`, path: `/${categoryKey}` },
          { label: 'Apple Trade In', path: '/' },
          { label: 'Financing', path: '/' },
        ],
      },
      {
        title: `More from ${categoryName}`,
        items: [
          { label: `${categoryName} Support`, path: '/' },
          { label: `AppleCare+ for ${categoryName}`, path: '/' },
          { label: 'Apple Intelligence', path: '/' },
        ],
      },
    ],
  };
};

/* ── GET /api/megamenu ── */
router.get('/', async (req, res) => {
  try {
    // Single optimized DB query fetching only necessary fields
    const products = await Product.find({ active: true }, 'id name tag category')
      .sort({ basePrice: -1 })
      .lean();

    const hardwareCategories = [
      { key: 'mac', name: 'Mac' },
      { key: 'iphone', name: 'iPhone' },
      { key: 'ipad', name: 'iPad' },
      { key: 'watch', name: 'Watch' },
      { key: 'airpods', name: 'AirPods' },
    ];

    const menuData = { ...SERVICE_MENUS };

    hardwareCategories.forEach(({ key, name }) => {
      menuData[key] = buildHardwareCategory(key, name, products);
    });

    res.json({ success: true, data: menuData });
  } catch (err) {
    console.error('MegaMenu error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate menu' });
  }
});

module.exports = router;
