import { useState } from "react";
import { Alert, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import AppShell from "../components/AppShell";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setSent(false);
      setError("");
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      if (!response.ok) throw new Error("Could not send reset email.");
      setSent(true);
    } catch (requestError) {
      setError(requestError.message || "Could not send reset email.");
    }
  };

  return (
    <AppShell maxWidth="sm" title="Reset password" subtitle="We&apos;ll send a secure reset link to your email.">
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField name="email" type="email" label="Email" required />
            <Button type="submit" variant="contained">
              Send reset link
            </Button>
            {sent && <Alert severity="success">If your account exists, a reset email has been sent.</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </AppShell>
  );
}
