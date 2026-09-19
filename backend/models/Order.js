const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true },
    name:      { type: String, required: true, trim: true },
    variant:   { type: String, trim: true },
    color:     { type: String, trim: true },
    storage:   { type: String, trim: true },
    price:     { type: Number, required: true, min: 0 },
    qty:       { type: Number, required: true, min: 1 },
    image:     { type: String, trim: true },
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    street:     { type: String, required: true, trim: true },
    city:       { type: String, required: true, trim: true },
    state:      { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country:    { type: String, default: 'India', trim: true },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ['card', 'upi', 'apple_pay', 'netbanking', 'emi'],
      default: 'card',
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'paid',
    },
    transactionId: { type: String, trim: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    customer:    { type: customerSchema, required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    items:       { type: [orderItemSchema], required: true, validate: [v => v.length > 0, 'At least one item required'] },
    subtotal:    { type: Number, required: true, min: 0 },
    tax:         { type: Number, required: true, min: 0 },
    shipping:    { type: Number, default: 0, min: 0 },
    total:       { type: Number, required: true, min: 0 },
    payment:     { type: paymentSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
