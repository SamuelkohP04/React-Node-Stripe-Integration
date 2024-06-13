const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const app = express();


// middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  //ensure user is not charged twice
  const idempotencyKey = uuidv4(); 
  return stripe.customers.create({
    email: token.email,
    source: token.id,
    // description: product.name,
    // metadata: {
    //   idempotencyKey
    // }
  }).then((customer) => {
    console.log("Customer created", customer);
    stripe.charges.create({
      amount: product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipient_email: token.email,
      description: product.name,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country,
      }
    }
  }, {idempotencyKey })
  
    .then(result => res.status(200).json(result))
    .catch((err => res.status(500).json(err)));
  })
});


//listen 
app.listen(process.env.PORT || 8282, () => {
  console.log('Server is running on port', process.env.PORT || 8282);
});