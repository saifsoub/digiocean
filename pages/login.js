import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Box, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import AppShell from "../components/AppShell";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/dashboard",
    });
  };

  return (
    <AppShell maxWidth="sm" title="Sign in" subtitle="Use credentials or a magic link powered by NextAuth + Resend.">
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField name="email" type="email" label="Email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            <TextField name="password" type="password" label="Password" required />
            <Button type="submit" variant="contained">
              Continue
            </Button>
            <Button type="button" variant="outlined" onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })} disabled={!email}>
              Send magic link
            </Button>
            <Box>
              <Link href="/forgot-password">Forgot password?</Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </AppShell>
  );
}
