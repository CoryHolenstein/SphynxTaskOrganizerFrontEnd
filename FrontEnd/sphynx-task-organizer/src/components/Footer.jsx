// src/components/Footer.jsx
import * as React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Your Company
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/privacy" underline="hover" color="text.secondary">
            Privacy
          </Link>
          <Link href="/terms" underline="hover" color="text.secondary">
            Terms
          </Link>
          <Link href="/support" underline="hover" color="text.secondary">
            Support
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
