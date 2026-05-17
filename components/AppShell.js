import Link from "next/link";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Admin", href: "/admin" },
  { label: "Agents", href: "/agents" },
];

export default function AppShell({ title, subtitle, children, maxWidth = "lg" }) {
  return (
    <Box sx={{ bgcolor: "#f6f9ff", minHeight: "100vh" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            DigitalOcean SaaS
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {navItems.map((item) => (
              <Button key={item.href} LinkComponent={Link} href={item.href} variant="text">
                {item.label}
              </Button>
            ))}
            <Button LinkComponent={Link} href="/login" variant="contained">
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth={maxWidth} sx={{ py: 6 }}>
        {title ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {subtitle ? <Typography color="text.secondary">{subtitle}</Typography> : null}
          </Box>
        ) : null}
        {children}
      </Container>
    </Box>
  );
}
