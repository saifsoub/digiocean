import { useState } from "react";
import { Alert, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email") }),
    });
    setSent(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Reset password
            </Typography>
            <Typography color="text.secondary">We&apos;ll send a secure reset link to your email.</Typography>
            <TextField name="email" type="email" label="Email" required />
            <Button type="submit" variant="contained">
              Send reset link
            </Button>
            {sent && <Alert severity="success">If your account exists, a reset email has been sent.</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
