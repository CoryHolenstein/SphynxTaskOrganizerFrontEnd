// src/layouts/PublicLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
