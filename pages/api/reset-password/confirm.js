import crypto from "crypto";
import { promisify } from "util";
import { prisma } from "../../../lib/prisma";

const scrypt = promisify(crypto.scrypt);
const SCRYPT_KEY_LENGTH = 64;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, token, password } = req.body || {};
  if (!email || !token || !password) {
    return res.status(400).json({ error: "email, token, and password are required" });
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.identifier !== email || verificationToken.expires < new Date()) {
    return res.status(400).json({ error: "Invalid or expired reset token" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hashBuffer = await scrypt(password, salt, SCRYPT_KEY_LENGTH);
  const passwordHash = `${salt}:${Buffer.from(hashBuffer).toString("hex")}`;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    }),
    prisma.verificationToken.delete({
      where: { token },
    }),
  ]);

  return res.status(200).json({ ok: true });
}
