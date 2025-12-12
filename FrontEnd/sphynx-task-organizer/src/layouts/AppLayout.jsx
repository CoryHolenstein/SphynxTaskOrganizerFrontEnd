import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MainHeader />


      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>


    </Box>
  );
}
