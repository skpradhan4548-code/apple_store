/**
 * megaMenuData.js
 * Comprehensive navigation data for Apple-style Mega Menu
 */

export const MEGA_MENU_DATA = {
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
          { label: 'Accessories', path: '/' },
        ],
      },
      {
        title: 'Quick Links',
        items: [
          { label: 'Find a Store', path: '/' },
          { label: 'Order Status', path: '/cart' },
          { label: 'Apple Trade In', path: '/' },
          { label: 'Financing', path: '/' },
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

  mac: {
    columns: [
      {
        title: 'Explore Mac',
        featured: true,
        items: [
          { label: 'Explore All Mac', path: '/mac' },
          { label: 'MacBook Pro', path: '/product/macbook-pro', badge: 'New' },
          { label: 'Mac mini', path: '/product/mac-mini', badge: 'New' },
          { label: 'iMac', path: '/product/imac', badge: 'New' },
          { label: 'MacBook Air', path: '/mac' },
          { label: 'Mac Studio', path: '/mac' },
          { label: 'Displays', path: '/mac' },
        ],
      },
      {
        title: 'Shop Mac',
        items: [
          { label: 'Shop Mac', path: '/mac' },
          { label: 'Mac Accessories', path: '/' },
          { label: 'Apple Trade In', path: '/' },
          { label: 'Financing', path: '/' },
        ],
      },
      {
        title: 'More from Mac',
        items: [
          { label: 'Mac Support', path: '/' },
          { label: 'AppleCare+ for Mac', path: '/' },
          { label: 'macOS Sequoia', path: '/' },
          { label: 'Apple Intelligence', path: '/' },
          { label: 'Apps by Apple', path: '/' },
          { label: 'Continuity', path: '/' },
        ],
      },
    ],
  },

  ipad: {
    columns: [
      {
        title: 'Explore iPad',
        featured: true,
        items: [
          { label: 'Explore All iPad', path: '/ipad' },
          { label: 'iPad Pro', path: '/product/ipad-pro', badge: 'M4' },
          { label: 'iPad Air', path: '/ipad' },
          { label: 'iPad', path: '/ipad' },
          { label: 'iPad mini', path: '/ipad' },
          { label: 'Apple Pencil', path: '/ipad' },
          { label: 'Keyboards', path: '/ipad' },
        ],
      },
      {
        title: 'Shop iPad',
        items: [
          { label: 'Shop iPad', path: '/ipad' },
          { label: 'iPad Accessories', path: '/' },
          { label: 'Apple Trade In', path: '/' },
          { label: 'Financing', path: '/' },
        ],
      },
      {
        title: 'More from iPad',
        items: [
          { label: 'iPad Support', path: '/' },
          { label: 'AppleCare+ for iPad', path: '/' },
          { label: 'iPadOS 18', path: '/' },
          { label: 'Apple Intelligence', path: '/' },
          { label: 'iCloud+', path: '/' },
        ],
      },
    ],
  },

  iphone: {
    columns: [
      {
        title: 'Explore iPhone',
        featured: true,
        items: [
          { label: 'Explore All iPhone', path: '/iphone' },
          { label: 'iPhone 16 Pro', path: '/product/iphone-16-pro', badge: 'New' },
          { label: 'iPhone 16', path: '/product/iphone-16', badge: 'New' },
          { label: 'iPhone 15', path: '/iphone' },
          { label: 'iPhone 14', path: '/iphone' },
          { label: 'iPhone SE', path: '/iphone' },
        ],
      },
      {
        title: 'Shop iPhone',
        items: [
          { label: 'Shop iPhone', path: '/iphone' },
          { label: 'iPhone Accessories', path: '/' },
          { label: 'Apple Trade In', path: '/' },
          { label: 'Financing', path: '/' },
        ],
      },
      {
        title: 'More from iPhone',
        items: [
          { label: 'iPhone Support', path: '/' },
          { label: 'AppleCare+ for iPhone', path: '/' },
          { label: 'iOS 18', path: '/' },
          { label: 'Apple Intelligence', path: '/' },
          { label: 'Apple Pay', path: '/' },
        ],
      },
    ],
  },

  watch: {
    columns: [
      {
        title: 'Explore Watch',
        featured: true,
        items: [
          { label: 'Explore All Apple Watch', path: '/watch' },
          { label: 'Apple Watch Series 10', path: '/product/apple-watch-series-10', badge: 'New' },
          { label: 'Apple Watch Ultra 2', path: '/watch' },
          { label: 'Apple Watch SE', path: '/watch' },
          { label: 'Apple Watch Nike', path: '/watch' },
          { label: 'Apple Watch Bands', path: '/watch' },
        ],
      },
      {
        title: 'Shop Watch',
        items: [
          { label: 'Shop Apple Watch', path: '/watch' },
          { label: 'Apple Watch Bands', path: '/watch' },
          { label: 'Apple Watch Accessories', path: '/' },
          { label: 'Apple Trade In', path: '/' },
        ],
      },
      {
        title: 'More from Watch',
        items: [
          { label: 'Apple Watch Support', path: '/' },
          { label: 'AppleCare+', path: '/' },
          { label: 'watchOS 11', path: '/' },
          { label: 'Apple Fitness+', path: '/' },
        ],
      },
    ],
  },

  airpods: {
    columns: [
      {
        title: 'Explore AirPods',
        featured: true,
        items: [
          { label: 'Explore All AirPods', path: '/airpods' },
          { label: 'AirPods Pro 2', path: '/product/airpods-pro', badge: 'New' },
          { label: 'AirPods 4', path: '/airpods' },
          { label: 'AirPods 4 with ANC', path: '/airpods' },
          { label: 'AirPods Max', path: '/airpods' },
        ],
      },
      {
        title: 'Shop AirPods',
        items: [
          { label: 'Shop AirPods', path: '/airpods' },
          { label: 'AirPods Accessories', path: '/' },
        ],
      },
      {
        title: 'More from AirPods',
        items: [
          { label: 'AirPods Support', path: '/' },
          { label: 'AppleCare+ for Headphones', path: '/' },
          { label: 'Apple Music', path: '/' },
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
          { label: 'TV & Home Accessories', path: '/' },
        ],
      },
      {
        title: 'More from TV & Home',
        items: [
          { label: 'Apple TV Support', path: '/' },
          { label: 'HomePod Support', path: '/' },
          { label: 'Apple TV App', path: '/' },
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
          { label: 'Explore Entertainment', path: '/entertainment' },
          { label: 'Apple One', path: '/entertainment' },
          { label: 'Apple TV+', path: '/entertainment' },
          { label: 'Apple Music', path: '/entertainment' },
          { label: 'Apple Arcade', path: '/entertainment' },
          { label: 'Apple Podcasts', path: '/entertainment' },
          { label: 'Apple Books', path: '/entertainment' },
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
          { label: 'Apple Watch Accessories', path: '/watch' },
          { label: 'AirPods Accessories', path: '/airpods' },
        ],
      },
      {
        title: 'Explore Accessories',
        items: [
          { label: 'Made by Apple', path: '/' },
          { label: 'Beats by Dr. Dre', path: '/' },
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
          { label: 'Music Support', path: '/' },
          { label: 'TV Support', path: '/tv-home' },
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
      {
        title: 'Helpful Topics',
        items: [
          { label: 'Get AppleCare+', path: '/' },
          { label: 'Apple ID & Password', path: '/' },
          { label: 'Billing & Subscriptions', path: '/' },
          { label: 'Find My', path: '/' },
        ],
      },
    ],
  },
};
