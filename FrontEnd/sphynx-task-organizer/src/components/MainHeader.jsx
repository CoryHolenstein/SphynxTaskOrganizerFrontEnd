import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: 56, // smaller than default
          justifyContent: "center",
          zIndex: 1200,
        }}
      >
       <Toolbar
        disableGutters
        sx={{
          minHeight: 56,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton size="small" edge="start" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Sphynx Task Organizer
            </Typography>
          </Box>
        </Container>
      </Toolbar>

      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            minWidth: 280,
            borderRadius: 2,
            mt: 1,
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <MenuItem onClick={() => { navigate("/home"); handleMenuClose(); }}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>

        <MenuItem onClick={() => { navigate("/tasks"); handleMenuClose(); }}>
          <ListItemIcon>
            <TaskIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </MenuItem>

        <MenuItem onClick={() => { navigate("/settings"); handleMenuClose(); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        
        <MenuItem onClick={() => { navigate("/about"); handleMenuClose(); }}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="About" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/logout");
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MainHeader;
