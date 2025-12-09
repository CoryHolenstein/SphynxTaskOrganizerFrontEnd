

import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Card, CardContent, Typography, Chip, Select, MenuItem, FormControl, InputLabel, Alert, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainHeader from '../../components/MainHeader';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { createTask } from '../../api/CreateTask';
import { getAllTasks } from '../../api/GetTasks';
import { deleteTask } from '../../api/DeleteTask';
import { useAuthStore } from '../../store/useAuthStore';

const TasksPage = () => {
    const muiTheme = useMuiTheme();
    const { loginIncognito } = useAuthStore();
    const userId = useAuthStore((state) => state.user?.email);
    const MAX_TASKS_PER_USER = 100;

    const [tasks, setTasks] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [filterRepeat, setFilterRepeat] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskRepeat, setTaskRepeat] = useState('weekly');

    const toggleCreateTask = () => {
        setShowCreateTask(!showCreateTask);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            setError('User not authenticated');
            return;
        }

        if (tasks.length >= MAX_TASKS_PER_USER) {
            setError(`Task limit of ${MAX_TASKS_PER_USER} reached. Please delete a task before adding a new one.`);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const payload = {
                userId,
                name: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
                repeat: taskRepeat
            };

            const result = await createTask(payload);
            setTasks([...tasks, result.item]);
            setTaskName('');
            setTaskDescription('');
            setTaskDueDate('');
            setTaskRepeat('weekly');
            setShowCreateTask(false);
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error('Error creating task:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (!userId) {
            setError('User not authenticated');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await deleteTask(userId, taskId);
            setTasks(tasks.filter(task => task.taskId !== taskId));
        } catch (err) {
            setError('Failed to delete task. Please try again.');
            console.error('Error deleting task:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const filteredTasks = filterRepeat === 'all' ? tasks : tasks.filter(task => task.repeat === filterRepeat);
    const tasksRemaining = MAX_TASKS_PER_USER - tasks.length;
    const isTaskLimitReached = tasks.length >= MAX_TASKS_PER_USER;

    const getRepeatColor = (repeat) => {
        const colors = {
            daily: 'error',
            weekly: 'primary',
            monthly: 'info',
            yearly: 'success'
        };
        return colors[repeat] || 'default';
    };

    useEffect(() => {
        // Initialize incognito user if not already authenticated
        if (!userId) {
            loginIncognito();
        }
    }, [userId, loginIncognito]);

    useEffect(() => {
        // Load tasks when userId is available
        if (userId) {
            loadTasks();
        }
    }, [userId]);

    const loadTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('[TasksPage] Loading tasks for userId:', userId);
            const fetchedTasks = await getAllTasks(userId);
            setTasks(fetchedTasks || []);
            console.log('[TasksPage] Loaded tasks:', fetchedTasks);
        } catch (err) {
            setError('Failed to load tasks. Please refresh the page.');
            console.error('[TasksPage] Error loading tasks:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Tasks updated:', tasks);
    }, [tasks]);




return(
    <Box sx={{ pt: 10, pb: 4, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
        <MainHeader />
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Tasks Page
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleCreateTask}
                    sx={{ mb: 2 }}
                    disabled={isLoading}
                >
                    {showCreateTask ? 'Hide Create Task' : 'Show Create Task'}
                </Button>
            </Box>

            {showCreateTask && (
                <Card sx={{ mb: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Create New Task
                        </Typography>
                        {isTaskLimitReached && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                You have reached the maximum task limit of {MAX_TASKS_PER_USER}. Please delete a task to add a new one.
                            </Alert>
                        )}
                        <form onSubmit={handleCreateTask}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField 
                                    label="Task Name" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <TextField 
                                    label="Description" 
                                    variant="outlined" 
                                    fullWidth 
                                    multiline 
                                    rows={4}
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    disabled={isLoading}
                                />
                                <TextField 
                                    label="Due Date" 
                                    type="date" 
                                    variant="outlined" 
                                    fullWidth 
                                    InputLabelProps={{ shrink: true }}
                                    value={taskDueDate}
                                    onChange={(e) => setTaskDueDate(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <FormControl fullWidth disabled={isLoading}>
                                    <InputLabel>Repeat</InputLabel>
                                    <Select 
                                        value={taskRepeat}
                                        onChange={(e) => setTaskRepeat(e.target.value)}
                                        label="Repeat"
                                    >
                                        <MenuItem value="daily">Daily</MenuItem>
                                        <MenuItem value="weekly">Weekly</MenuItem>
                                        <MenuItem value="monthly">Monthly</MenuItem>
                                        <MenuItem value="yearly">Yearly</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    sx={{ alignSelf: 'flex-start' }}
                                    disabled={isTaskLimitReached || isLoading}
                                >
                                    {isLoading ? <CircularProgress size={24} /> : 'Create Task'}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Your Tasks ({tasks.length}/{MAX_TASKS_PER_USER})
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Tasks remaining: {tasksRemaining}
                </Typography>
                <FormControl sx={{ minWidth: 200, mb: 3 }} disabled={isLoading}>
                    <InputLabel>Filter by Repeat</InputLabel>
                    <Select 
                        value={filterRepeat}
                        onChange={(e) => setFilterRepeat(e.target.value)}
                        label="Filter by Repeat"
                    >
                        <MenuItem value="all">All Tasks</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                </FormControl>

                {isLoading && filteredTasks.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr' }, gap: 2 }}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <Card 
                                key={task.taskId}
                                sx={{
                                    backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                    '&:hover': {
                                        boxShadow: muiTheme.palette.mode === 'dark' 
                                            ? '0 8px 24px rgba(255, 255, 255, 0.1)'
                                            : '0 8px 24px rgba(0, 0, 0, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', flex: 1, color: muiTheme.palette.mode === 'dark' ? '#ffffff' : 'inherit' }}>
                                            {task.name}
                                        </Typography>
                                        <Chip 
                                            label={task.repeat} 
                                            color={getRepeatColor(task.repeat)}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ mb: 1, color: muiTheme.palette.mode === 'dark' ? '#b0b0b0' : 'textSecondary' }}>
                                        {task.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, color: muiTheme.palette.mode === 'dark' ? '#64b5f6' : '#1976d2', fontWeight: 'bold' }}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            variant="outlined" 
                                            size="small"
                                            startIcon={<EditIcon />}
                                            disabled={isLoading}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteTask(task.taskId)}
                                            disabled={isLoading}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                            No tasks found for the selected filter.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    </Box>
);

}

export default TasksPage;