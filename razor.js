const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
app.use(helmet());

require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: 'process.env.RAZORPAY_KEY_ID',
  key_secret: 'process.env.RAZORPAY_KEY_SECRET'
});

// Create Order Endpoint
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      notes
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Payment Verification Endpoint
app.post('/verify-payment', async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', 'process.env.RAZORPAY_KEY_SECRET');
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest('hex');
    
    if (generatedSignature === signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});