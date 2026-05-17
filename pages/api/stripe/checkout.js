import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!stripe || !process.env.STRIPE_PRICE_ID) {
    return res.status(200).json({ ok: true, message: "Stripe not configured." });
  }

  const origin = req.headers.origin || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${origin}/dashboard`,
    cancel_url: `${origin}/dashboard`,
  });

  return res.status(200).json({ url: session.url });
}
