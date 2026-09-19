const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const ipadProducts = [
  {
    id: 'ipad-pro',
    slug: 'ipad',
    name: 'iPad Pro',
    tagline: 'The ultimate iPad experience with the most advanced technology.',
    description: 'Thinpossible. Supercharged by Apple M4 chip with tandem OLED Ultra Retina XDR display.',
    longDesc: 'The thinnest Apple product ever made, iPad Pro features the groundbreaking Ultra Retina XDR display, outrageous performance with the M4 chip, and powerful AI capabilities.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1715197413543',
    bg: '#1d1d1f',
    textColor: '#f5f5f7',
    accentColor: '#2997ff',
    tag: 'New',
    size: 'normal',
    basePrice: 99900,
    category: 'ipad',
    colors: [
      { label: 'Space Black', hex: '#2e2c2e', price: 99900 },
      { label: 'Silver', hex: '#e2e4e5', price: 99900 },
    ],
    storage: [
      { label: '256 GB', price: 99900 },
      { label: '512 GB', price: 119900 },
      { label: '1 TB', price: 149900 },
      { label: '2 TB', price: 179900 },
    ],
    specs: [
      { label: 'Chip', value: 'Apple M4 chip' },
      { label: 'Display', value: '11" or 13" Ultra Retina XDR display' },
      { label: 'Camera', value: '12MP Wide camera with 4K video' },
      { label: 'Apple Pencil', value: 'Compatible with Apple Pencil Pro' },
    ],
    stock: 50,
    active: true,
  },
  {
    id: 'ipad-air',
    slug: 'ipad',
    name: 'iPad Air',
    tagline: 'Serious performance in a thin and light design.',
    description: 'Fresh Air. Now available in 11" and all-new 13" models powered by the fast M2 chip.',
    longDesc: 'Now with an expansive 13-inch display option, powered by the incredible speed of Apple M2, with front camera on the landscape edge.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-11-select-wifi-blue-202405?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1715197413543',
    bg: '#f0f4f8',
    textColor: '#1d1d1f',
    accentColor: '#0071e3',
    tag: 'New',
    size: 'normal',
    basePrice: 59900,
    category: 'ipad',
    colors: [
      { label: 'Space Grey', hex: '#68696d', price: 59900 },
      { label: 'Blue', hex: '#a9b7c6', price: 59900 },
      { label: 'Purple', hex: '#bfb4c8', price: 59900 },
      { label: 'Starlight', hex: '#e1dcd5', price: 59900 },
    ],
    storage: [
      { label: '128 GB', price: 59900 },
      { label: '256 GB', price: 69900 },
      { label: '512 GB', price: 89900 },
      { label: '1 TB', price: 109900 },
    ],
    specs: [
      { label: 'Chip', value: 'Apple M2 chip' },
      { label: 'Display', value: '11" or 13" Liquid Retina display' },
      { label: 'Camera', value: '12MP Wide camera' },
      { label: 'Apple Pencil', value: 'Compatible with Apple Pencil Pro' },
    ],
    stock: 60,
    active: true,
  },
  {
    id: 'ipad',
    slug: 'ipad',
    name: 'iPad',
    tagline: 'The colourful, all-screen iPad for the things you do every day.',
    description: 'Lovable. Drawable. Magical. All-screen design with 10.9-inch Liquid Retina display.',
    longDesc: 'Colourfully reimagined to be more capable, intuitive, and fun. With an all-screen 10.9-inch Liquid Retina display and four gorgeous colors.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-storage-select-202212-blue?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1667592478589',
    bg: '#fbfbfd',
    textColor: '#1d1d1f',
    accentColor: '#0071e3',
    tag: '',
    size: 'normal',
    basePrice: 34900,
    category: 'ipad',
    colors: [
      { label: 'Blue', hex: '#5484a4', price: 34900 },
      { label: 'Pink', hex: '#e3677a', price: 34900 },
      { label: 'Yellow', hex: '#f2d352', price: 34900 },
      { label: 'Silver', hex: '#e2e4e5', price: 34900 },
    ],
    storage: [
      { label: '64 GB', price: 34900 },
      { label: '256 GB', price: 49900 },
    ],
    specs: [
      { label: 'Chip', value: 'A14 Bionic chip' },
      { label: 'Display', value: '10.9" Liquid Retina display' },
      { label: 'Camera', value: '12MP Wide camera, 12MP Ultra Wide front' },
      { label: 'Apple Pencil', value: 'Compatible with Apple Pencil (USB-C)' },
    ],
    stock: 80,
    active: true,
  },
  {
    id: 'ipad-mini',
    slug: 'ipad',
    name: 'iPad mini',
    tagline: 'The full iPad experience in an ultra-portable design.',
    description: 'Mega power. Mini size. Powered by the blistering A17 Pro chip with Apple Intelligence support.',
    longDesc: 'Pocket-sized power with an 8.3-inch Liquid Retina display, superfast A17 Pro chip, Apple Intelligence, and support for Apple Pencil Pro.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-purple-202410?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1728345478342',
    bg: '#f8f8fa',
    textColor: '#1d1d1f',
    accentColor: '#0071e3',
    tag: 'New',
    size: 'normal',
    basePrice: 49900,
    category: 'ipad',
    colors: [
      { label: 'Space Grey', hex: '#68696d', price: 49900 },
      { label: 'Blue', hex: '#a9b7c6', price: 49900 },
      { label: 'Purple', hex: '#bfb4c8', price: 49900 },
      { label: 'Starlight', hex: '#e1dcd5', price: 49900 },
    ],
    storage: [
      { label: '128 GB', price: 49900 },
      { label: '256 GB', price: 59900 },
      { label: '512 GB', price: 79900 },
    ],
    specs: [
      { label: 'Chip', value: 'A17 Pro chip' },
      { label: 'Display', value: '8.3" Liquid Retina display' },
      { label: 'Camera', value: '12MP Wide camera, 12MP Ultra Wide front' },
      { label: 'Apple Pencil', value: 'Compatible with Apple Pencil Pro' },
    ],
    stock: 40,
    active: true,
  },
];

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/apple_store';
  console.log('Connecting to database...');
  await mongoose.connect(uri);

  console.log('Seeding iPad lineup products...');
  for (const item of ipadProducts) {
    await Product.findOneAndUpdate(
      { id: item.id },
      { $set: item },
      { upsert: true, new: true, runValidators: true }
    );
    console.log(`✓ Seeded/Updated: ${item.name} (${item.id})`);
  }

  console.log('Finished seeding iPad products successfully.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
