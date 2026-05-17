import crypto from "crypto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import { prisma } from "./prisma";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendVerificationRequest({ identifier, url }) {
  if (!resend || !process.env.EMAIL_FROM) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: identifier,
    subject: "Your DigitalOcean magic sign-in link",
    html: `<p>Sign in securely by clicking this link:</p><p><a href="${url}">${url}</a></p>`,
  });
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.passwordHash) return null;
        const hash = crypto.createHash("sha256").update(credentials.password).digest("hex");
        if (hash !== user.passwordHash) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
