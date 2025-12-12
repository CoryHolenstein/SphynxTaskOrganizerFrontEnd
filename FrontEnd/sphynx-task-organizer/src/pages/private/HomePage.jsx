import React, { useEffect, useState } from 'react';
import { Box, Container, Card, CardContent, Typography, Button, Grid, LinearProgress } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import MainHeader from '../../components/MainHeader';
import TaskIcon from '@mui/icons-material/Task';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import useAuthStore from "../../store/useAuthStore";
import Footer from '../../components/Footer';
import { getAllTasks } from "../../api/GetTasks";


const HomePage = () => {
    const navigate = useNavigate();
    const muiTheme = useMuiTheme();
    const auth = useAuth();
    const userId = useAuthStore((s) => s.user?.email);
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);


    useEffect(() => {
    if (!userId) return;

    async function loadTasks() {
        try {
        const fetched = await getAllTasks(userId);
        setTasks(fetched || []);
        } catch (err) {
        console.error("[HomePage] Failed to load tasks", err);
        setTasks([]);
        } finally {
        setLoadingTasks(false);
        }
    }

    loadTasks();
    }, [userId]);


/*
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/");
        }

    }, [auth.isAuthenticated, navigate]);
*/

    const userEmail = useAuthStore((s) => s.user?.email);


    if (auth.isLoading) return <div>Loading...</div>;
    if (auth.error) return <div>Error: {auth.error.message}</div>;
    

    const today = new Date();

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
    (t) => new Date(t.dueDate) < today
    ).length;

    const upcomingTasks = tasks.filter(
    (t) => new Date(t.dueDate) >= today
    ).length;

    const taskCompletionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
            <Box sx={{ pt: 10, pb: 4 }}>
                <Container maxWidth="lg">
                    {/* Welcome Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Welcome, {userEmail}! 👋
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                        Last activity: {new Date().toLocaleDateString()}
                        </Typography>

                    </Box>

                    {/* Stats Grid */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                '&:hover': {
                                    boxShadow: muiTheme.palette.mode === 'dark'
                                        ? '0 8px 24px rgba(255, 255, 255, 0.1)'
                                        : '0 8px 24px rgba(0, 0, 0, 0.15)',
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
                                        {totalTasks}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                '&:hover': {
                                    boxShadow: muiTheme.palette.mode === 'dark'
                                        ? '0 8px 24px rgba(255, 255, 255, 0.1)'
                                        : '0 8px 24px rgba(0, 0, 0, 0.15)',
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
                                        {completedTasks}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                '&:hover': {
                                    boxShadow: muiTheme.palette.mode === 'dark'
                                        ? '0 8px 24px rgba(255, 255, 255, 0.1)'
                                        : '0 8px 24px rgba(0, 0, 0, 0.15)',
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
                                        {upcomingTasks}
                                    </Typography>
                                    <Typography variant="h4">
                                        {Math.round(taskCompletionPercentage)}%
                                    </Typography>
                                    <LinearProgress value={taskCompletionPercentage} />

                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                '&:hover': {
                                    boxShadow: muiTheme.palette.mode === 'dark'
                                        ? '0 8px 24px rgba(255, 255, 255, 0.1)'
                                        : '0 8px 24px rgba(0, 0, 0, 0.15)',
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
                    <Card sx={{ mb: 4, backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff' }}>
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