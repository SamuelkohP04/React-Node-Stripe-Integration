const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');
const app = express();


// middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});



//listen 
app.listen(process.env.PORT || 8282, () => {
  console.log('Server is running on port', process.env.PORT || 8282);
});