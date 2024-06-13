# React-Node-Stripe-Integration

This project demonstrates how to integrate Stripe payment processing with a React frontend and a Node.js backend. The integration is based on the tutorial by Hitesh Choudhary.

## Features

- Stripe payment processing
- Node.js and Express backend
- React frontend with Stripe Checkout

## Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Stripe account

## Setup

### Backend

1. Clone the repository and navigate to the `stripe-backend` directory:
    ```bash
    git clone https://github.com/your-repo/react-node-stripe-integration.git
    cd react-node-stripe-integration/stripe-backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `stripe-backend` directory and add your Stripe secret key:
    ```env
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the `stripe-frontend` directory:
    ```bash
    cd ../stripe-frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. In the `App.js` file, replace the placeholder with your Stripe publishable key:
    ```javascript
    <StripeCheckout 
      stripeKey="your_publishable_key"
      token={makePayment}
      name="Buy React"
      amount={product.price * 100}
    >
      <button className="btn-large pink">Buy React - it's only ${product.price}</button>
    </StripeCheckout>
    ```

4. Start the frontend server:
    ```bash
    npm start
    ```

## Acknowledgements

- [Hitesh Choudhary](https://github.com/hiteshchoudhary) for the tutorial on integrating Stripe payment processing with a React frontend and a Node.js backend.
- [Stripe](https://stripe.com/) for providing a payment processing platform.