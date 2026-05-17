import Link from "next/link";
import { signIn } from "next-auth/react";
import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";

export default function Login() {
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
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Sign in
            </Typography>
            <Typography color="text.secondary">Use credentials or a magic link powered by NextAuth + Resend.</Typography>
            <TextField name="email" type="email" label="Email" required />
            <TextField name="password" type="password" label="Password" required />
            <Button type="submit" variant="contained">
              Continue
            </Button>
            <Button type="button" variant="outlined" onClick={() => signIn("email", { callbackUrl: "/dashboard" })}>
              Send magic link
            </Button>
            <Box>
              <Link href="/forgot-password">Forgot password?</Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
