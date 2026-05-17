import { Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

const cards = [
  "Review customer accounts and role assignments",
  "Monitor subscriptions and failed payments",
  "Audit login events and account recovery activity",
  "Track AI usage and enforce quotas",
];

export default function Admin() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Admin dashboard
        </Typography>
        <Typography color="text.secondary">Centralized controls for users, subscriptions, and security operations.</Typography>
      </Stack>
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
    </Container>
  );
}
