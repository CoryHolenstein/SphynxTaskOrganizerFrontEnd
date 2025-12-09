import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LoginButton from '../../components/LoginButton';

const Landing = () => {
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const handleSignUp = () => {
    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const redirect = encodeURIComponent(import.meta.env.VITE_COGNITO_REDIRECT_URI);

    const url =
      `https://${domain}/oauth2/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&scope=openid+email+profile` +
      `&redirect_uri=${redirect}`;

    window.location.href = url;
  };


  const features = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Stay Organized',
      description: 'Keep all your tasks in one place, organized by frequency and priority.'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Track Progress',
      description: 'Visualize your productivity and track what you\'ve accomplished.'
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 48, color: '#ff9800' }} />,
      title: 'Stay On Top',
      description: 'Never miss a task with smart reminders and recurring task management.'
    }
  ];

  return (
    <Box sx={{ 
      backgroundColor: isDark ? '#121212' : '#f5f5f5', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: isDark 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sphynx Task Organizer
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
            Take control of your productivity. Stay organized, stay focused, stay ahead.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>


    

              <LoginButton name={"Get Started"} />
               <LoginButton />
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            mb: 6,
            color: isDark ? '#ffffff' : '#000000'
          }}>
            Why Choose Sphynx?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark 
                      ? '0 12px 32px rgba(255, 255, 255, 0.1)'
                      : '0 12px 32px rgba(0, 0, 0, 0.15)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: isDark ? '#ffffff' : '#000000' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? '#b0b0b0' : '#666' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: { xs: 6, md: 8 },
        background: isDark ? '#1e1e1e' : '#f9f9f9',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: isDark ? '#ffffff' : '#000000' }}>
            Ready to Get Organized?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: isDark ? '#b0b0b0' : '#666' }}>
            Join thousands of users who are already staying on top of their tasks with Sphynx.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleSignUp}
            sx={{
              backgroundColor: '#FF9900',
              color: 'white',
              px: 6,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#ff8800' }
            }}
          >
            Sign In Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
