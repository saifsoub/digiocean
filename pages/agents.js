import { Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import AppShell from "../components/AppShell";

const integrations = ["OpenAI", "Anthropic", "Google", "DigitalOcean GradientAI", "Custom API"];

export default function Agents() {
  return (
    <AppShell title="Agents control room" subtitle="Import, configure, and orchestrate agents from supported platforms.">
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
    </AppShell>
  );
}
