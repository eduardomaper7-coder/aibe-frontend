import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('Falta STRIPE_SECRET_KEY en .env.local');
}

export const stripe = new Stripe(secretKey);


