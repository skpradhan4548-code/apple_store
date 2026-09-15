const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('./productData');
require('dotenv').config();

const seedProducts = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required to seed products.');
  }

  await mongoose.connect(process.env.MONGO_URI);

  for (const product of products) {
    await Product.updateOne(
      { id: product.id },
      { $set: product },
      { upsert: true, runValidators: true }
    );
  }

  console.log(`Seeded ${products.length} products.`);
};

seedProducts()
  .catch((err) => {
    console.error('Product seed failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
