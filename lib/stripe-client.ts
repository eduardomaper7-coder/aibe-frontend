import { loadStripe, type Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk && typeof window !== 'undefined') {
    console.warn('Falta NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY en .env.local');
  }
  if (!stripePromise) {
    stripePromise = loadStripe(pk as string);
  }
  return stripePromise;
}


