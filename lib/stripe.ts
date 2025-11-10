// lib/stripe.ts
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

// Usa la versión por defecto del SDK (sin apiVersion)
export const stripe = new Stripe(secretKey);


