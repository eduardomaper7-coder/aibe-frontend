import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('Falta STRIPE_SECRET_KEY en .env.local');
}

export const stripe = new Stripe(secretKey);

["STRIPE_PRICE_BASIC","STRIPE_PRICE_BUSINESS","STRIPE_PRICE_PLUS"].forEach((k) => {
  const v = process.env[k];
  if (!v) throw new Error(`${k} no está definido`);
  if (!v.startsWith("price_")) {
    throw new Error(`${k} debe ser un PRICE_ID (price_…), no ${v}`);
  }
});

