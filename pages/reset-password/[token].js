import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import AppShell from "../../components/AppShell";

export default function ResetPasswordTokenPage() {
  const router = useRouter();
  const { token, email = "" } = router.query;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("");
      return;
    }

    try {
      setError("");
      setStatus("");
      const response = await fetch("/api/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          token,
          password,
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to reset password.");
      setStatus("Password updated successfully. You can now sign in.");
    } catch (requestError) {
      setError(requestError.message || "Unable to reset password.");
    }
  };

  return (
    <AppShell maxWidth="sm" title="Create a new password" subtitle="Set a new password for your account.">
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField name="email" label="Email" defaultValue={email} required />
            <TextField name="password" type="password" label="New password" required />
            <TextField name="confirmPassword" type="password" label="Confirm password" required />
            <Button type="submit" variant="contained">
              Save new password
            </Button>
            {status ? <Alert severity="success">{status}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
          </Stack>
        </CardContent>
      </Card>
    </AppShell>
  );
}
