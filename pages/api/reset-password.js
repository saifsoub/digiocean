import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "../../lib/prisma";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

  await prisma.verificationToken.upsert({
    where: { token },
    create: {
      identifier: email,
      token,
      expires: expiresAt,
    },
    update: {
      identifier: email,
      expires: expiresAt,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password/${encodeURIComponent(token)}?email=${encodeURIComponent(email)}`;
  if (resend && process.env.EMAIL_FROM) {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your DigitalOcean password",
      html: `<p>Reset your password using this link:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  }

  return res.status(200).json({ ok: true });
}
