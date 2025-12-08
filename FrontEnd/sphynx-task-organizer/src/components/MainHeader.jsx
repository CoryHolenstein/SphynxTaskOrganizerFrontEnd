
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, zIndex: 1200, width: '100%' }}>
        <Toolbar onClick={handleMenuClick} sx={{ cursor: 'pointer', justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            Sphynx Task Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: '350px',
            borderRadius: '12px',
            marginTop: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/');
            handleMenuClose();
          }}
          sx={{
            py: 2.5,
            px: 3,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon sx={{ mr: 2, color: '#1976d2' }}>
            <HomeIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ fontSize: '1.1rem' }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/tasks');
            handleMenuClose();
          }}
          sx={{
            py: 2.5,
            px: 3,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon sx={{ mr: 2, color: '#1976d2' }}>
            <TaskIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Tasks" primaryTypographyProps={{ fontSize: '1.1rem' }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/settings');
            handleMenuClose();
          }}
          sx={{
            py: 2.5,
            px: 3,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon sx={{ mr: 2, color: '#1976d2' }}>
            <SettingsIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '1.1rem' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default MainHeader;