import React from 'react';
import { Box, Container, Card, CardContent, Typography, Switch, FormControlLabel, Divider, Button } from '@mui/material';
import MainHeader from '../../components/MainHeader';
import { useTheme } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleNotificationToggle = () => {
    alert('Notification settings will be available soon!');
  };

  const handleEmailToggle = () => {
    alert('Email settings will be available soon!');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
      <Box sx={{ pt: 10, pb: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Settings
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your preferences and account settings
            </Typography>
          </Box>

          {/* Appearance Settings */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Appearance
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    icon={<LightModeIcon />}
                    checkedIcon={<DarkModeIcon />}
                  />
                }
                label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {isDarkMode
                  ? 'Dark mode is enabled. This may help reduce eye strain in low-light environments.'
                  : 'Light mode is enabled. This provides better visibility in bright environments.'}
              </Typography>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Notifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked onChange={handleNotificationToggle} />}
                label="Push Notifications"
              />
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Receive notifications about task updates and reminders.
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked onChange={handleEmailToggle} />}
                label="Email Notifications"
              />
              <Typography variant="body2" color="textSecondary">
                Receive email digests of your task updates.
              </Typography>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Account
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> user@example.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>Member Since:</strong> January 1, 2024
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" color="primary">
                  Change Password
                </Button>
                <Button variant="outlined" color="error">
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                About
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Version:</strong> 1.0.0
              </Typography>
              <Typography variant="body2">
                <strong>Sphynx Task Organizer</strong> - Organize your tasks efficiently and stay productive.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default SettingsPage;
