/**
 * products.js — Central product catalogue
 * Images: Apple Store CDN (publicly accessible)
 */

const CDN = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is';

export const PRODUCTS = [
  /* ── iPhone 16 Pro ─────────────────────────────────── */
  {
    id: 'iphone-16-pro',
    slug: 'iphone',
    name: 'iPhone 16 Pro',
    tagline: 'Hello, Apple Intelligence.',
    description: 'A17 Pro chip. A groundbreaking camera system.',
    longDesc: 'iPhone 16 Pro features a titanium design, the A17 Pro chip, and a Pro camera system with 5x Telephoto. With Apple Intelligence built in, it understands and creates language and images, takes action across apps, and draws from your personal context.',
    image: `${CDN}/iphone16pro-titaniumblack-select?wid=532&hei=660&fmt=jpeg&qlt=90&.v=1725388402405`,
    bg: '#1d1d1f',
    textColor: '#ffffff',
    accentColor: '#a78bfa',
    tag: 'New',
    size: 'large',
    basePrice: 134900,
    category: 'iphone',
    colors: [
      { label: 'Black Titanium',  hex: '#3d3634', price: 134900 },
      { label: 'White Titanium',  hex: '#e8e4df', price: 134900 },
      { label: 'Natural Titanium',hex: '#c9b99a', price: 134900 },
      { label: 'Desert Titanium', hex: '#c5a882', price: 134900 },
    ],
    storage: [
      { label: '128 GB', price: 134900 },
      { label: '256 GB', price: 144900 },
      { label: '512 GB', price: 164900 },
      { label: '1 TB',   price: 184900 },
    ],
    specs: [
      { label: 'Chip',    value: 'A17 Pro with 6-core CPU' },
      { label: 'Display', value: '6.3" Super Retina XDR, ProMotion' },
      { label: 'Camera',  value: '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto' },
      { label: 'Battery', value: 'Up to 33 hours video playback' },
      { label: 'OS',      value: 'iOS 18 with Apple Intelligence' },
    ],
  },

  /* ── iPhone 16 ──────────────────────────────────────── */
  {
    id: 'iphone-16',
    slug: 'iphone',
    name: 'iPhone 16',
    tagline: 'Built for Apple Intelligence.',
    description: 'A18 chip. Camera Control. All-day battery life.',
    longDesc: 'iPhone 16 features the A18 chip and Apple Intelligence, the new Camera Control, a next-generation portrait system, and all-day battery life — in a beautiful, durable design.',
    image: `${CDN}/iphone16-teal-select-202409?wid=532&hei=660&fmt=jpeg&qlt=90&.v=1724925739861`,
    bg: '#f5f5f7',
    textColor: '#1d1d1f',
    accentColor: '#0066cc',
    tag: 'New',
    size: 'large',
    basePrice: 79900,
    category: 'iphone',
    colors: [
      { label: 'Teal',        hex: '#5b8a8b', price: 79900  },
      { label: 'Pink',        hex: '#e8b4b8', price: 79900  },
      { label: 'Ultramarine', hex: '#3a4d8f', price: 79900  },
      { label: 'White',       hex: '#f5f0e8', price: 79900  },
      { label: 'Black',       hex: '#3c3c3c', price: 79900  },
    ],
    storage: [
      { label: '128 GB', price: 79900  },
      { label: '256 GB', price: 89900  },
      { label: '512 GB', price: 109900 },
    ],
    specs: [
      { label: 'Chip',    value: 'A18 with 6-core CPU' },
      { label: 'Display', value: '6.1" Super Retina XDR' },
      { label: 'Camera',  value: '48MP Fusion + 12MP Ultra Wide, Camera Control' },
      { label: 'Battery', value: 'Up to 22 hours video playback' },
      { label: 'OS',      value: 'iOS 18 with Apple Intelligence' },
    ],
  },

  /* ── MacBook Pro 16 ─────────────────────────────────── */
  {
    id: 'macbook-pro',
    slug: 'mac',
    name: 'MacBook Pro',
    tagline: 'Mind-blowing. Head-turning.',
    description: 'M4 Pro chip. Up to 24-core GPU. Up to 24GB unified memory.',
    longDesc: 'MacBook Pro with M4 Pro delivers mind-blowing performance and up to 24 hours of battery life. With a stunning Liquid Retina XDR display and Apple Intelligence built in, it is the most capable Mac laptop ever made.',
    image: `${CDN}/mbp16-spaceblack-select-202410?wid=452&hei=420&fmt=jpeg&qlt=90&.v=1728916322980`,
    bg: '#1d1d1f',
    textColor: '#f5f5f7',
    accentColor: '#2997ff',
    tag: 'New',
    size: 'large',
    basePrice: 249900,
    category: 'mac',
    colors: [
      { label: 'Space Black',  hex: '#2b2d2e', price: 249900 },
      { label: 'Silver',       hex: '#e3e4e5', price: 249900 },
    ],
    storage: [
      { label: '512 GB SSD', price: 249900 },
      { label: '1 TB SSD',   price: 279900 },
      { label: '2 TB SSD',   price: 339900 },
    ],
    specs: [
      { label: 'Chip',    value: 'Apple M4 Pro, 14-core CPU' },
      { label: 'Display', value: '16.2" Liquid Retina XDR, ProMotion' },
      { label: 'Memory',  value: 'Up to 64GB unified memory' },
      { label: 'Battery', value: 'Up to 24 hours' },
      { label: 'Ports',   value: '3× Thunderbolt 5, HDMI, SD, MagSafe 3' },
    ],
  },

  /* ── AirPods Pro 2 ──────────────────────────────────── */
  {
    id: 'airpods-pro',
    slug: 'airpods',
    name: 'AirPods Pro 2',
    tagline: 'Hearing health. Now on AirPods.',
    description: 'Hearing aid feature. Noise Cancellation. Adaptive Audio.',
    longDesc: 'AirPods Pro 2 feature clinical-grade hearing health features including a Hearing Test, Hearing Aid, and Hearing Protection. They also deliver the world\'s best noise cancellation and Adaptive Audio.',
    image: `${CDN}/MQTQ3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1694014871985`,
    bg: '#f5f5f7',
    textColor: '#1d1d1f',
    accentColor: '#0066cc',
    tag: 'New',
    size: 'normal',
    basePrice: 24900,
    category: 'airpods',
    colors: [
      { label: 'White', hex: '#f5f5f5', price: 24900 },
    ],
    storage: [],
    specs: [
      { label: 'Chip',     value: 'Apple H2' },
      { label: 'ANC',      value: 'Active Noise Cancellation + Transparency mode' },
      { label: 'Battery',  value: '6 hours ANC, 30 hours total with case' },
      { label: 'Water',    value: 'IP54 dust, sweat, and water resistant' },
      { label: 'New',      value: 'Hearing Aid, Hearing Test, Hearing Protection' },
    ],
  },

  /* ── Apple Watch Series 10 ──────────────────────────── */
  {
    id: 'apple-watch-series-10',
    slug: 'watch',
    name: 'Apple Watch Series 10',
    tagline: 'Thinnest Apple Watch ever.',
    description: 'Bigger display. Faster charging. S10 chip.',
    longDesc: 'Apple Watch Series 10 is the thinnest Apple Watch ever with the largest display yet. It features the S10 chip, sleep apnea detection, and the fastest charging yet — all in an ultra-thin case.',
    image: `${CDN}/MYE53ref_FV98_VW_34FR+watch-case-46-aluminum-jetblack-nc-s10_VW_34FR+watch-face-46-aluminum-jetblack-nc-s10_VW_34FR?wid=400&hei=400&fmt=jpeg&qlt=90`,
    bg: '#000000',
    textColor: '#ffffff',
    accentColor: '#64d2ff',
    tag: 'New',
    size: 'normal',
    basePrice: 46900,
    category: 'watch',
    colors: [
      { label: 'Jet Black',  hex: '#2a2a2a', price: 46900 },
      { label: 'Rose Gold',  hex: '#b76e79', price: 46900 },
      { label: 'Silver',     hex: '#d4d4d4', price: 46900 },
    ],
    storage: [
      { label: '42mm', price: 46900 },
      { label: '46mm', price: 49900 },
    ],
    specs: [
      { label: 'Chip',     value: 'Apple S10' },
      { label: 'Display',  value: 'Always-On Retina LTPO OLED, largest ever' },
      { label: 'Health',   value: 'Sleep Apnea detection, ECG, Blood Oxygen' },
      { label: 'Battery',  value: '18 hours (36 hours Low Power Mode)' },
      { label: 'Water',    value: '50m water resistant' },
    ],
  },

  /* ── Mac mini ───────────────────────────────────────── */
  {
    id: 'mac-mini',
    slug: 'mac',
    name: 'Mac mini',
    tagline: 'Most affordable M4 Mac ever.',
    description: 'Compact redesign. M4 chip. Thunderbolt 5.',
    longDesc: 'The all-new Mac mini packs M4 or M4 Pro into the most compact Mac ever. With Thunderbolt 5 ports, it delivers extraordinary performance for pros and is Apple\'s most affordable M4 Mac.',
    image: `${CDN}/mac-mini-select-202411?wid=452&hei=420&fmt=jpeg&qlt=90&.v=1730998507985`,
    bg: '#f5f5f7',
    textColor: '#1d1d1f',
    accentColor: '#0066cc',
    tag: 'New',
    size: 'normal',
    basePrice: 59900,
    category: 'mac',
    colors: [
      { label: 'Silver', hex: '#e0e0e0', price: 59900 },
    ],
    storage: [
      { label: '256 GB SSD', price: 59900  },
      { label: '512 GB SSD', price: 79900  },
      { label: '1 TB SSD',   price: 99900  },
      { label: '2 TB SSD',   price: 139900 },
    ],
    specs: [
      { label: 'Chip',    value: 'Apple M4, 10-core CPU' },
      { label: 'Memory',  value: 'Up to 32GB unified memory' },
      { label: 'Ports',   value: '3× Thunderbolt 5, 2× USB-A, HDMI 2.1' },
      { label: 'Size',    value: '127mm × 127mm — smallest Mac ever' },
      { label: 'Battery', value: 'N/A (desktop)' },
    ],
  },

  /* ── iPad Pro ───────────────────────────────────────── */
  {
    id: 'ipad-pro',
    slug: 'ipad',
    name: 'iPad Pro',
    tagline: 'Supercharged by M4.',
    description: 'Thinnest Apple product ever. Tandem OLED display.',
    longDesc: 'The iPad Pro with M4 is the thinnest Apple product ever made. The stunning Ultra Retina XDR display with tandem OLED delivers extreme brightness and true blacks. With Apple Intelligence, it\'s the most capable iPad ever.',
    image: `${CDN}/ipad-pro-13-select-wifi-spacegray-202405?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1715197413543`,
    bg: '#1d1d1f',
    textColor: '#f5f5f7',
    accentColor: '#2997ff',
    tag: 'New',
    size: 'normal',
    basePrice: 99900,
    category: 'ipad',
    colors: [
      { label: 'Space Black', hex: '#2d2d2d', price: 99900  },
      { label: 'Silver',      hex: '#e5e5e5', price: 99900  },
    ],
    storage: [
      { label: '256 GB', price: 99900  },
      { label: '512 GB', price: 119900 },
      { label: '1 TB',   price: 149900 },
      { label: '2 TB',   price: 179900 },
    ],
    specs: [
      { label: 'Chip',    value: 'Apple M4, 10-core CPU' },
      { label: 'Display', value: '11" or 13" Ultra Retina XDR (Tandem OLED)' },
      { label: 'Camera',  value: '12MP Wide + 12MP Ultra Wide + LiDAR' },
      { label: 'Battery', value: 'Up to 10 hours' },
      { label: 'Pencil',  value: 'Apple Pencil Pro compatible' },
    ],
  },

  /* ── iMac ───────────────────────────────────────────── */
  {
    id: 'imac',
    slug: 'imac',
    name: 'iMac',
    tagline: 'Hello, M4.',
    description: 'All-in-one. M4 power. Seven stunning colors.',
    longDesc: 'The iMac with M4 brings extraordinary performance, a beautiful 24-inch 4.5K Retina display, and Apple Intelligence to an all-in-one desktop in seven stunning colors.',
    image: `${CDN}/imac-24-blue-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697317706554`,
    bg: '#f5f5f7',
    textColor: '#1d1d1f',
    accentColor: '#0066cc',
    tag: 'New',
    size: 'normal',
    basePrice: 134900,
    category: 'mac',
    colors: [
      { label: 'Blue',     hex: '#5e85b0', price: 134900 },
      { label: 'Green',    hex: '#6b8c76', price: 134900 },
      { label: 'Pink',     hex: '#d48e9b', price: 134900 },
      { label: 'Silver',   hex: '#d6d6d6', price: 134900 },
      { label: 'Orange',   hex: '#d9814f', price: 134900 },
      { label: 'Purple',   hex: '#8e82b0', price: 134900 },
      { label: 'Yellow',   hex: '#d4b84a', price: 134900 },
    ],
    storage: [
      { label: '256 GB SSD', price: 134900 },
      { label: '512 GB SSD', price: 154900 },
      { label: '1 TB SSD',   price: 174900 },
    ],
    specs: [
      { label: 'Chip',    value: 'Apple M4, 10-core CPU' },
      { label: 'Display', value: '24" 4.5K Retina, 500 nits, P3 wide colour' },
      { label: 'Memory',  value: 'Up to 32GB unified memory' },
      { label: 'Camera',  value: '12MP Center Stage webcam' },
      { label: 'Ports',   value: '2 or 4× Thunderbolt 4, USB-A, Ethernet' },
    ],
  },
];

/* ── Helpers ─────────────────────────────── */
export const getProductById = (id)  => PRODUCTS.find(p => p.id   === id);
export const getProductsBySlug = (slug) => PRODUCTS.filter(p => p.slug === slug || p.id === slug);
export const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;
