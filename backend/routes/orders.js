const router  = require('express').Router();
const Order   = require('../models/Order');
const Product = require('../models/Product');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

/* ── POST /api/orders (Create Order with Authoritative Server Pricing) ── */
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { customer, shippingAddress, items, paymentMethod = 'card' } = req.body;

    // 1. Validate customer details
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ message: 'Customer name, email, and phone are required.' });
    }
    if (!EMAIL_REGEX.test(customer.email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // 2. Validate shipping address
    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.postalCode) {
      return res.status(400).json({ message: 'Complete shipping address is required.' });
    }

    // 3. Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Your bag is empty. Please add items to order.' });
    }

    // 4. Server-Side Price Verification & Inventory Stock Check
    const verifiedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const productId = item.productId || item.id;
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);

      const product = await Product.findOne({ id: productId, active: true });
      if (!product) {
        return res.status(400).json({ message: `Product "${item.name || productId}" is no longer available.` });
      }

      if (product.stock < qty) {
        return res.status(400).json({
          message: `Only ${product.stock} unit(s) of "${product.name}" are currently available in stock.`,
        });
      }

      // Authoritative pricing: resolve storage tier or base price
      let authoritativePrice = product.basePrice;
      if (item.storage && product.storage?.length) {
        const matchedStorage = product.storage.find(
          s => s.label.toLowerCase().trim() === item.storage.toLowerCase().trim()
        );
        if (matchedStorage) {
          authoritativePrice = matchedStorage.price;
        }
      }

      calculatedSubtotal += authoritativePrice * qty;

      verifiedItems.push({
        productId: product.id,
        name:      product.name,
        variant:   item.variant || [item.color, item.storage].filter(Boolean).join(', ') || null,
        color:     item.color || null,
        storage:   item.storage || null,
        price:     authoritativePrice,
        qty,
        image:     item.image || product.image,
      });
    }

    // Authoritative calculations
    const calculatedTax = Math.round(calculatedSubtotal * 0.18);
    const calculatedShipping = 0; // Free Apple standard delivery
    const calculatedTotal = calculatedSubtotal + calculatedTax + calculatedShipping;

    // Generate unique order number (e.g. W928471625)
    const orderNumber = 'W' + Math.floor(100000000 + Math.random() * 900000000);

    // 5. Create Order
    const order = await Order.create({
      orderNumber,
      user: req.user ? req.user._id : null,
      customer: {
        name:  customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
      },
      shippingAddress: {
        street:     shippingAddress.street.trim(),
        city:       shippingAddress.city.trim(),
        state:      shippingAddress.state.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        country:    shippingAddress.country?.trim() || 'India',
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      tax:      calculatedTax,
      shipping: calculatedShipping,
      total:    calculatedTotal,
      payment: {
        method: paymentMethod,
        status: 'paid',
        transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      },
      status: 'confirmed',
    });

    // 6. Decrement inventory stock safely
    for (const item of verifiedItems) {
      await Product.updateOne(
        { id: item.productId, stock: { $gte: item.qty } },
        { $inc: { stock: -item.qty } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      order,
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Unable to process your order. Please try again.' });
  }
});

/* ── GET /api/orders/my-orders (Authenticated User Order History) ── */
router.get('/my-orders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { 'customer.email': req.user.email },
      ],
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error('Fetch my-orders error:', err);
    res.status(500).json({ message: 'Unable to load orders.' });
  }
});

/* ── GET /api/orders/:orderRef (View Order Status) ── */
router.get('/:orderRef', optionalAuth, async (req, res) => {
  try {
    const { orderRef } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(orderRef);

    const query = isObjectId
      ? { $or: [{ _id: orderRef }, { orderNumber: orderRef }] }
      : { orderNumber: orderRef };

    const order = await Order.findOne(query);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // If authenticated, ensure unauthorized users cannot inspect others' orders
    if (order.user && req.user && !order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error('Fetch order error:', err);
    res.status(500).json({ message: 'Unable to load order.' });
  }
});

module.exports = router;
