const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');
  
  // High quality transparent/clean Mac mini image
  const workingImage = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=452&hei=420&fmt=jpeg&qlt=90';
  
  await Product.updateOne(
    { id: 'mac-mini' },
    { $set: { image: workingImage } }
  );
  
  const updated = await Product.findOne({ id: 'mac-mini' }).select('id name image');
  console.log('Updated mac mini:', updated);
  
  await mongoose.disconnect();
}

run().catch(console.error);
