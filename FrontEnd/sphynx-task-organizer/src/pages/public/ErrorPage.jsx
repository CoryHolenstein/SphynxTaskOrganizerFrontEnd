// src/pages/public/ErrorPage.jsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        404
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you’re looking for doesn’t exist.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}
