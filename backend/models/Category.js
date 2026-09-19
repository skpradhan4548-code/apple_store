const mongoose = require('mongoose');

const chapterNavItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    badge: { type: String, trim: true, default: null },
    path: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const promoBannerSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    linkText: { type: String, required: true, trim: true },
    linkUrl: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const heroSlideSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true, trim: true },
    subhead: { type: String, trim: true },
    availability: { type: String, trim: true },
    primaryCtaText: { type: String, default: 'Learn more' },
    primaryCtaLink: { type: String, default: '#' },
    secondaryCtaText: { type: String, default: 'Buy' },
    secondaryCtaLink: { type: String, default: '#' },
    image: { type: String, required: true, trim: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    promo: { type: promoBannerSchema, required: true },
    chapterNav: { type: [chapterNavItemSchema], default: [] },
    filterTabs: { type: [String], default: ['All'] },
    hero: { type: heroSlideSchema, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
