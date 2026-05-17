import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

const tiles = [
  { title: "Current plan", value: "Pro Annual" },
  { title: "Monthly spend", value: "$49.00" },
  { title: "Storage used", value: "8.2 GB / 100 GB" },
  { title: "AI requests", value: "14,902 / month" },
];

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Customer dashboard
        </Typography>
        <Typography color="text.secondary">Manage subscriptions, invoices, uploads, and AI usage in one place.</Typography>
      </Stack>

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
        <Button variant="contained" onClick={() => fetch("/api/stripe/checkout", { method: "POST" })}>
          Upgrade plan
        </Button>
        <Button variant="outlined" onClick={() => fetch("/api/stripe/portal", { method: "POST" })}>
          Manage billing
        </Button>
      </Box>
    </Container>
  );
}
