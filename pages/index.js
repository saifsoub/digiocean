import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const features = [
  "Built-in login/auth with NextAuth",
  "Forgot password + magic link login",
  "Email notifications via Resend with PDF invoice attachments",
  "Stripe billing (upgrade/cancel plan)",
  "File uploads to DigitalOcean Spaces",
  "PostgreSQL via Prisma ORM",
  "DigitalOcean GradientAI Serverless Inference API",
  "Admin dashboard for users and subscriptions",
  "Agents control room with multi-platform imports",
  "One-click deploy to DigitalOcean App Platform",
];

const sections = [
  { title: "Auth", href: "/login", description: "Secure sign-in, magic links, and password reset." },
  { title: "Customer Dashboard", href: "/dashboard", description: "Usage, plan details, invoices, and settings." },
  { title: "Admin Console", href: "/admin", description: "Manage users, subscriptions, and feature access." },
  { title: "Agents Control Room", href: "/agents", description: "Import and orchestrate agents from connected platforms." },
];

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#f6f9ff", minHeight: "100vh" }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            DigitalOcean SaaS Starter
          </Typography>
          <Button LinkComponent={Link} href="/login" variant="contained">
            Launch App
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={3} alignItems="flex-start">
          <Chip label="Production-ready Next.js SaaS template" color="primary" />
          <Typography variant="h2" sx={{ fontWeight: 800, maxWidth: 900 }}>
            Build and deploy a full SaaS platform on DigitalOcean with best-practice integrations.
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 800 }}>
            This starter includes complete architecture foundations for authentication, billing, email, uploads, AI inference, and admin workflows.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button LinkComponent={Link} href="/dashboard" variant="contained" size="large">
              View Product UI
            </Button>
            <Button LinkComponent={Link} href="/admin" variant="outlined" size="large">
              Open Admin Console
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, md: 6 }} key={feature}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body1">{feature}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {sections.map((section) => (
            <Grid size={{ xs: 12, md: 6 }} key={section.title}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    {section.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {section.description}
                  </Typography>
                  <Button LinkComponent={Link} href={section.href} variant="text">
                    Open {section.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
