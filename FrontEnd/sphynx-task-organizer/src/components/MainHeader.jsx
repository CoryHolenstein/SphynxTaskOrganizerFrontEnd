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
  Tabs,
  Tab,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get("tab") || "0";
  const activeTab = parseInt(currentTab);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSearchParams({ tab: newValue.toString() });
  };

  const tabs = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Tasks", icon: <TaskIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: 1200,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 56,
            display: "flex",
            justifyContent: isMobile ? "space-between" : "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box sx={{ textAlign: "center", flex: isMobile ? 1 : "initial" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: isMobile ? "1rem" : "1.1rem" }}>
              Sphynx Task Organizer
            </Typography>
          </Box>

          {!isMobile && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                flex: 1,
                mx: 2,
                "& .MuiTab-root": {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minHeight: 56,
                  textTransform: "none",
                  fontSize: "0.9rem",
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          )}

          <IconButton
            size="small"
            edge="end"
            onClick={handleMenuClick}
            aria-label="menu"
            sx={{ p: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: 180,
            borderRadius: 2,
            mt: 1,
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <MenuItem onClick={() => { navigate("/about"); handleMenuClose(); }}>
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

      {isMobile && (
        <BottomNavigation
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction
              key={index}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </BottomNavigation>
      )}
    </>
  );
};

export default MainHeader;
