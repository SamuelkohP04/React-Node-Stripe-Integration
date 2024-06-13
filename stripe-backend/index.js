require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/payment', async (req, res) => {
  const { paymentMethodId, email } = req.body;
  console.log("Payment Method ID", paymentMethodId);
  console.log("Email", email);

  const idempotencyKey = uuidv4();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Example amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      receipt_email: email,
    }, { idempotencyKey });

    res.status(200).send({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Listen
app.listen(process.env.PORT || 8282, () => {
  console.log('Server is running on port', process.env.PORT || 8282);
});
