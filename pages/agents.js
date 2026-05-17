import { Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";

const integrations = ["OpenAI", "Anthropic", "Google", "DigitalOcean GradientAI", "Custom API"];

export default function Agents() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Agents control room
        </Typography>
        <Typography color="text.secondary">Import, configure, and orchestrate agents from supported platforms.</Typography>
      </Stack>
      <Grid container spacing={2}>
        {integrations.map((integration) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={integration}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6">{integration}</Typography>
                  <Chip label="Import available" color="primary" size="small" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
