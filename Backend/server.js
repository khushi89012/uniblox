const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory stores for carts, orders, and discount codes
const cartStore = {};
const orderStore = [];
const discountCodes = [];
let orderCount = 0;
const nthOrder = 3;

// Helper to generate random discount codes
function generateDiscountCode() {
  return 'DISC' + Math.floor(1000 + Math.random() * 9000); 
}

// Route to add items to the cart
app.post('/cart/add', (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  if (!user_id || !item_id || !quantity) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!cartStore[user_id]) {
    cartStore[user_id] = [];
  }

  // Add item to the user's cart
  cartStore[user_id].push({ item_id, quantity });
  return res.status(200).json({ message: 'Item added to cart' });
});


// Route to checkout and place an order
app.post('/checkout', (req, res) => {
  const { user_id, discount_code } = req.body;

  if (!user_id || !cartStore[user_id] || cartStore[user_id].length === 0) {
    return res.status(400).json({ error: 'Cart is empty or invalid user' });
  }

  
  // Calculate total (for simplicity, assume each item costs $10)
  let total = cartStore[user_id].reduce((sum, item) => sum + item.quantity * 10, 0);

  // Check if discount code is valid
  let discount = 0;
  if (discount_code && discountCodes.includes(discount_code)) {
    discount = total * 0.10; // 10% discount
    total -= discount;
  }

  // Increment order count and check if a discount code should be generated
  orderCount++;
  if (orderCount % nthOrder === 0) {
    const newDiscountCode = generateDiscountCode();
    discountCodes.push(newDiscountCode);
    console.log(`New discount code generated: ${newDiscountCode}`);
  }

  // Save the order
  orderStore.push({
    user_id,
    total,
    discount_code: discount_code || null,
    discount_applied: discount
  });

  // Clear user's cart after checkout
  cartStore[user_id] = [];

  return res.status(200).json({ total, discount_applied: discount });
});

// Route to generate a discount code (admin use)
app.post('/admin/generate-discount', (req, res) => {
  const newDiscountCode = generateDiscountCode();
  discountCodes.push(newDiscountCode);
  return res.status(200).json({ message: 'Discount code generated', code: newDiscountCode });
});

// Route to get the admin report
app.get('/admin/report', (req, res) => {
  const totalRevenue = orderStore.reduce((sum, order) => sum + order.total, 0);
  const totalDiscount = orderStore.reduce((sum, order) => sum + order.discount_applied, 0);

  return res.status(200).json({
    total_items_sold: orderStore.length,
    total_revenue: totalRevenue,
    total_discount_given: totalDiscount,
    discount_codes: discountCodes
  });
});

// Export app for testing
module.exports = app;

const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
