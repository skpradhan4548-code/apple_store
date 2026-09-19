const router = require('express').Router();
const Category = require('../models/Category');

const DEFAULT_CATEGORIES = {
  mac: {
    slug: 'mac',
    title: 'Mac',
    promo: {
      text: 'Last chance to get AirPods when you buy Mac with education savings. Ends 24/09.*',
      linkText: 'Shop',
      linkUrl: '/mac',
    },
    chapterNav: [
      { label: 'MacBook Air', icon: 'https://www.apple.com/v/mac/home/ca/images/family/macbook_air__eb5sn2ppimom_large.svg', badge: null, path: '/product/macbook-air' },
      { label: 'MacBook Pro', icon: 'https://www.apple.com/v/mac/home/ca/images/family/macbook_pro__eamc4bbq4wqu_large.svg', badge: null, path: '/product/macbook-pro' },
      { label: 'iMac', icon: 'https://www.apple.com/v/mac/home/ca/images/family/imac__e5hh9u3k3aqe_large.svg', badge: null, path: '/product/imac' },
      { label: 'Mac mini', icon: 'https://www.apple.com/v/mac/home/ca/images/family/mac_mini__c90mr63qn42a_large.svg', badge: 'New', path: '/product/mac-mini' },
      { label: 'Mac Studio', icon: 'https://www.apple.com/v/mac/home/ca/images/family/mac_studio__c1r6r4v563eq_large.svg', badge: 'New', path: '/mac' },
      { label: 'Compare', icon: 'https://www.apple.com/v/mac/home/ca/images/family/mac_compare__c979t51lptie_large.svg', badge: null, path: '/mac' },
      { label: 'Displays', icon: 'https://www.apple.com/v/mac/home/ca/images/family/mac_displays__c1i3b76i6ymq_large.svg', badge: null, path: '/mac' },
      { label: 'Accessories', icon: 'https://www.apple.com/v/mac/home/ca/images/family/mac_accessories__c8xs5j7v45mu_large.svg', badge: null, path: '/mac' },
    ],
    filterTabs: ['All Models', 'Laptops', 'Desktops'],
    hero: {
      headline: 'MacBook Pro',
      subhead: 'Mind-blowing. Head-turning.',
      availability: 'Available from ₹1,69,900.00* or ₹26,983/mo. for 6 mo.',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/product/macbook-pro',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/product/macbook-pro',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      theme: 'dark',
    },
  },
  ipad: {
    slug: 'ipad',
    title: 'iPad',
    promo: {
      text: 'Last chance to get Apple Pencil when you buy iPad with education savings. Ends 24/09.*',
      linkText: 'Shop',
      linkUrl: '/ipad',
    },
    chapterNav: [
      { label: 'iPad Pro', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipadpro_light__du7x7yg7w9ie_large.svg', badge: null, path: '/product/ipad-pro' },
      { label: 'iPad Air', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipadair_light__erf9nlsl1342_large.svg', badge: null, path: '/ipad' },
      { label: 'iPad', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipad_light__ch718sp85rma_large.svg', badge: null, path: '/ipad' },
      { label: 'iPad mini', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipadmini_light__b1iajm0e6aw2_large.svg', badge: null, path: '/ipad' },
      { label: 'Compare', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipad_comp_light__b2sgw1ptslg2_large.svg', badge: null, path: '/ipad' },
      { label: 'Apple Pencil', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/apple_pencil_light__e6nflst3imiy_large.svg', badge: null, path: '/ipad' },
      { label: 'Keyboards', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/keyboard_light__fz69904vvdum_large.svg', badge: null, path: '/ipad' },
      { label: 'Accessories', icon: 'https://www.apple.com/v/ipad/home/cl/images/chapternav/ipad_acc_light__fy8xsnnrgnm6_large.svg', badge: null, path: '/ipad' },
    ],
    filterTabs: ['All Models', 'iPad Pro', 'iPad Air', 'iPad'],
    hero: {
      headline: 'iPad Pro',
      subhead: 'Thinpossible.',
      availability: 'From ₹99,900.00* or ₹15,817/mo. for 6 mo.',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/product/ipad-pro',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/product/ipad-pro',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      theme: 'light',
    },
  },
  iphone: {
    slug: 'iphone',
    title: 'iPhone',
    promo: {
      text: 'Get up to ₹7000 instant cashback on selected iPhone models with eligible cards. Plus up to 6 months of No Cost EMI.‡',
      linkText: 'Shop iPhone',
      linkUrl: '/iphone',
    },
    chapterNav: [
      { label: 'iPhone 16 Pro', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_16_pro__erqbtnhgflm6_large.svg', badge: 'New', path: '/product/iphone-16-pro' },
      { label: 'iPhone 16', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_16__c5wo9etv12gm_large.svg', badge: 'New', path: '/product/iphone-16' },
      { label: 'iPhone 15', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_15__buwagpj0llom_large.svg', badge: null, path: '/iphone' },
      { label: 'iPhone 14', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_14__erik4ebsydmu_large.svg', badge: null, path: '/iphone' },
      { label: 'Compare', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_compare__bwhjl6gf2zyq_large.svg', badge: null, path: '/iphone' },
      { label: 'Accessories', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_acc__fjh6r1b41pqq_large.svg', badge: null, path: '/iphone' },
      { label: 'Shop iPhone', icon: 'https://www.apple.com/v/iphone/home/bv/images/chapternav/iphone_shop__cxst241e3d6e_large.svg', badge: null, path: '/iphone' },
    ],
    filterTabs: ['All Models', 'iPhone 16 Pro', 'iPhone 16'],
    hero: {
      headline: 'iPhone 16 Pro',
      subhead: 'Hello, Apple Intelligence.',
      availability: 'Available from ₹1,19,900.00* or ₹19,983/mo. for 6 mo.',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/product/iphone-16-pro',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/product/iphone-16-pro',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      theme: 'dark',
    },
  },
  watch: {
    slug: 'watch',
    title: 'Apple Watch',
    promo: {
      text: 'Now you can buy Apple Watch with education savings.*',
      linkText: 'Shop',
      linkUrl: '/watch',
    },
    chapterNav: [
      { label: 'Apple Watch Series 10', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_series_10__f250325405eq_large.svg', badge: 'New', path: '/product/apple-watch-series-10' },
      { label: 'Apple Watch Ultra 2', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_ultra_2__dw827z155kya_large.svg', badge: 'New Colours', path: '/watch' },
      { label: 'Apple Watch SE', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_se__d0q78y842ve6_large.svg', badge: null, path: '/watch' },
      { label: 'Compare', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_compare__epuzt2t51eia_large.svg', badge: null, path: '/watch' },
      { label: 'Straps', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_bands__dvgh7rsm5sq6_large.svg', badge: 'New Colours', path: '/watch' },
      { label: 'Accessories', icon: 'https://www.apple.com/v/watch/home/cb/images/chapternav/watch_nav_accessories__ea8v61p30fom_large.svg', badge: null, path: '/watch' },
    ],
    filterTabs: ['All Models', 'Series 10', 'Ultra 2', 'SE'],
    hero: {
      headline: 'Apple Watch Series 10',
      subhead: 'Thinscredible.',
      availability: 'From ₹46,900.00* or ₹7,817/mo. for 6 mo.',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/product/apple-watch-series-10',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/product/apple-watch-series-10',
      image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80',
      theme: 'light',
    },
  },
  airpods: {
    slug: 'airpods',
    title: 'AirPods',
    promo: {
      text: 'Get 3 months of Apple Music free with your AirPods.**',
      linkText: 'Buy',
      linkUrl: '/airpods',
    },
    chapterNav: [
      { label: 'AirPods 4', icon: 'https://www.apple.com/v/airpods/shared/chapternav/images/overview/airpods_4__bsp77p00n36u_large.svg', badge: 'New', path: '/airpods' },
      { label: 'AirPods Pro 2', icon: 'https://www.apple.com/v/airpods/shared/chapternav/images/overview/airpods_pro_2__e9u49e5ktd6a_large.svg', badge: null, path: '/product/airpods-pro' },
      { label: 'AirPods Max', icon: 'https://www.apple.com/v/airpods/shared/chapternav/images/overview/airpods_max__f2y0661131m6_large.svg', badge: 'New Colours', path: '/airpods' },
      { label: 'Compare', icon: 'https://www.apple.com/v/airpods/shared/chapternav/images/overview/airpods_compare__e8p1mew50kqa_large.svg', badge: null, path: '/airpods' },
      { label: 'Apple Music', icon: 'https://www.apple.com/v/airpods/shared/chapternav/images/overview/apple_music__g8m3h589k36e_large.svg', badge: null, path: '/entertainment' },
    ],
    filterTabs: ['All Models', 'AirPods 4', 'AirPods Pro', 'AirPods Max'],
    hero: {
      headline: 'AirPods Pro 2',
      subhead: 'Pro-level Active Noise Cancellation.',
      availability: 'From ₹24,900.00* or ₹4,150/mo. for 6 mo.',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/product/airpods-pro',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/product/airpods-pro',
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80',
      theme: 'dark',
    },
  },
  'tv-home': {
    slug: 'tv-home',
    title: 'TV & Home',
    promo: {
      text: 'Get 3 months of Apple TV+ free when you buy an Apple device.*',
      linkText: 'Shop',
      linkUrl: '/tv-home',
    },
    chapterNav: [
      { label: 'Apple TV 4K', icon: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=200&hei=130&fmt=png-alpha&qlt=90', badge: null, path: '/tv-home' },
      { label: 'HomePod', icon: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-select-midnight-202210?wid=200&hei=130&fmt=png-alpha&qlt=90', badge: null, path: '/tv-home' },
      { label: 'HomePod mini', icon: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-yellow-202110?wid=200&hei=130&fmt=png-alpha&qlt=90', badge: null, path: '/tv-home' },
      { label: 'Accessories', icon: 'https://www.apple.com/v/tv-home/k/images/chapternav/tv_home_accessories__bv47p7a08bwm_large.svg', badge: null, path: '/tv-home' },
    ],
    filterTabs: ['All Models', 'Apple TV', 'HomePod'],
    hero: {
      headline: 'Apple TV 4K',
      subhead: 'The Apple experience. Cinematic in every sense.',
      availability: 'From ₹14,900.00*',
      primaryCtaText: 'Learn more',
      primaryCtaLink: '/tv-home',
      secondaryCtaText: 'Buy',
      secondaryCtaLink: '/tv-home',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
      theme: 'dark',
    },
  },
  entertainment: {
    slug: 'entertainment',
    title: 'Entertainment',
    promo: {
      text: 'Get up to 3 months free of your favourite Apple services.**',
      linkText: 'Learn more',
      linkUrl: '/entertainment',
    },
    chapterNav: [
      { label: 'Apple One', icon: 'https://www.apple.com/v/entertainment/l/images/overview/hero_apple_one__ch519s47n7ie_large.svg', badge: null, path: '/entertainment' },
      { label: 'Apple TV+', icon: 'https://www.apple.com/v/entertainment/l/images/overview/hero_apple_tv_plus__eox08f57v4eq_large.svg', badge: null, path: '/entertainment' },
      { label: 'Apple Music', icon: 'https://www.apple.com/v/entertainment/l/images/overview/hero_apple_music__by851u15ymc2_large.svg', badge: null, path: '/entertainment' },
      { label: 'Apple Arcade', icon: 'https://www.apple.com/v/entertainment/l/images/overview/hero_apple_arcade__d2zsz6r51l26_large.svg', badge: null, path: '/entertainment' },
      { label: 'Apple Podcasts', icon: 'https://www.apple.com/v/entertainment/l/images/overview/hero_apple_podcasts__drptq7y01242_large.svg', badge: null, path: '/entertainment' },
    ],
    filterTabs: ['All Services'],
    hero: {
      headline: 'Apple TV+',
      subhead: 'Get 3 months of Apple TV+ free when you buy an Apple device.',
      availability: '₹99/month after free trial.',
      primaryCtaText: 'Try it free',
      primaryCtaLink: '/entertainment',
      secondaryCtaText: 'Learn more',
      secondaryCtaLink: '/entertainment',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80',
      theme: 'dark',
    },
  },
};

/* ── GET /api/categories/:slug ── */
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug.trim().toLowerCase();
    
    // Check if category exists in DB
    let category = await Category.findOne({ slug }).lean();
    
    // If not in DB, fallback to default and lazily seed
    if (!category && DEFAULT_CATEGORIES[slug]) {
      try {
        category = await Category.create(DEFAULT_CATEGORIES[slug]);
      } catch (err) {
        // In case of parallel create or constraint, use memory object
        category = DEFAULT_CATEGORIES[slug];
      }
    }

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Set cache control for high performance
    res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    return res.json({ category });
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ message: 'Server error loading category' });
  }
});

/* ── GET /api/categories ── */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().select('slug title promo').lean();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Error loading categories' });
  }
});

module.exports = router;
