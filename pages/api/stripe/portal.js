import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!stripe || !process.env.STRIPE_CUSTOMER_ID) {
    return res.status(200).json({ ok: true, message: "Stripe portal not configured." });
  }

  const origin = req.headers.origin || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const session = await stripe.billingPortal.sessions.create({
    customer: process.env.STRIPE_CUSTOMER_ID,
    return_url: `${origin}/dashboard`,
  });

  return res.status(200).json({ url: session.url });
}
