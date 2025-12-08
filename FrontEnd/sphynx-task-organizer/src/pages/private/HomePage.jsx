import React, { useState } from 'react';
import { Box, Container, Card, CardContent, Typography, Button, Grid, LinearProgress } from '@mui/material';
import MainHeader from '../../components/MainHeader';
import TaskIcon from '@mui/icons-material/Task';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    
    // Mock user data
    const userData = {
        name: 'User',
        totalTasks: 15,
        completedTasks: 8,
        upcomingTasks: 3,
        lastActivityDate: new Date().toLocaleDateString()
    };

    const taskCompletionPercentage = (userData.completedTasks / userData.totalTasks) * 100;

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <MainHeader />
            <Box sx={{ pt: 10, pb: 4 }}>
                <Container maxWidth="lg">
                    {/* Welcome Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Welcome, {userData.name}! 👋
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Last activity: {userData.lastActivityDate}
                        </Typography>
                    </Box>

                    {/* Stats Grid */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-4px)',
                                },
                                transition: 'all 0.3s ease',
                            }}>
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <TaskIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Total Tasks
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        {userData.totalTasks}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-4px)',
                                },
                                transition: 'all 0.3s ease',
                            }}>
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <CheckCircleIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Completed
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                                        {userData.completedTasks}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-4px)',
                                },
                                transition: 'all 0.3s ease',
                            }}>
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <TrendingUpIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Upcoming
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                                        {userData.upcomingTasks}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-4px)',
                                },
                                transition: 'all 0.3s ease',
                            }}>
                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Progress
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                                        {Math.round(taskCompletionPercentage)}%
                                    </Typography>
                                    <LinearProgress variant="determinate" value={taskCompletionPercentage} sx={{ width: '100%' }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Quick Actions */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Quick Actions
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => navigate('/tasks')}
                                >
                                    View All Tasks
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={() => navigate('/tasks')}
                                >
                                    Create New Task
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}

export default HomePage;