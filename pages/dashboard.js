import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import AppShell from "../components/AppShell";

const tiles = [
  { title: "Current plan", value: "Pro Annual" },
  { title: "Monthly spend", value: "$49.00" },
  { title: "Storage used", value: "8.2 GB / 100 GB" },
  { title: "AI requests", value: "14,902 / month" },
];

export default function Dashboard() {
  const [status, setStatus] = useState("");

  const openBillingSession = async (endpoint) => {
    try {
      setStatus("");
      const response = await fetch(endpoint, { method: "POST" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Request failed");
      if (payload.url) {
        window.location.assign(payload.url);
        return;
      }
      setStatus(payload.message || "Billing endpoint completed.");
    } catch (error) {
      setStatus(error.message || "Unable to complete billing action.");
    }
  };

  return (
    <AppShell title="Customer dashboard" subtitle="Manage subscriptions, invoices, uploads, and AI usage in one place.">
      <Grid container spacing={2}>
        {tiles.map((tile) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tile.title}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">{tile.title}</Typography>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  {tile.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => openBillingSession("/api/stripe/checkout")}>
          Upgrade plan
        </Button>
        <Button variant="outlined" onClick={() => openBillingSession("/api/stripe/portal")}>
          Manage billing
        </Button>
      </Box>
      {status ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {status}
        </Typography>
      ) : null}
    </AppShell>
  );
}
