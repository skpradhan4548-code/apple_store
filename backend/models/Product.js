const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    hex: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const specSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    longDesc: { type: String, trim: true },
    image: { type: String, required: true, trim: true },
    bg: { type: String, trim: true },
    textColor: { type: String, trim: true },
    accentColor: { type: String, trim: true },
    tag: { type: String, trim: true },
    size: { type: String, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true, trim: true },
    colors: { type: [optionSchema], default: [] },
    storage: { type: [optionSchema], default: [] },
    specs: { type: [specSchema], default: [] },
    stock: { type: Number, required: true, default: 0, min: 0 },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
