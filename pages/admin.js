import { Card, CardContent, Grid, Typography } from "@mui/material";
import AppShell from "../components/AppShell";

const cards = [
  "Review customer accounts and role assignments",
  "Monitor subscriptions and failed payments",
  "Audit login events and account recovery activity",
  "Track AI usage and enforce quotas",
];

export default function Admin() {
  return (
    <AppShell title="Admin dashboard" subtitle="Centralized controls for users, subscriptions, and security operations.">
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, md: 6 }} key={card}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>{card}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AppShell>
  );
}
