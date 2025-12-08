
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Card, CardContent, Typography, Chip, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TasksPage = () => {
    // Configurable task limit
    const MAX_TASKS_PER_USER = 100;

    const mockTasks = [{ id: 1, name: 'Task 1', description: 'Description for Task 1', dueDate: '2024-12-01', repeat: 'yearly' },
                        { id: 2, name: 'Task 2', description: 'Description for Task 2', dueDate: '2024-11-15', repeat: 'monthly' },
                        { id: 3, name: 'Task 3', description: 'Description for Task 3', dueDate: '2024-10-20', repeat: 'weekly' }       
    ]


    const [tasks, setTasks] = useState(mockTasks);
    const [showCreateTask, setShowCreateTask] = useState(true);
    const [filterRepeat, setFilterRepeat] = useState('all');

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskRepeat, setTaskRepeat] = useState('weekly');


    const toggleCreateTask = () => {
        setShowCreateTask(!showCreateTask);
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        
        if (tasks.length >= MAX_TASKS_PER_USER) {
            alert(`Task limit of ${MAX_TASKS_PER_USER} reached. Please delete a task before adding a new one.`);
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            repeat: taskRepeat
        };

        setTasks([...tasks, newTask]);
        setTaskName('');
        setTaskDescription('');
        setTaskDueDate('');
        setTaskRepeat('weekly');
    }

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
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
        console.log('Tasks updated:', tasks);

    }, [tasks]);




return(
    <Box sx={{ pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Tasks Page
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleCreateTask}
                    sx={{ mb: 2 }}
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
                                />
                                <TextField 
                                    label="Description" 
                                    variant="outlined" 
                                    fullWidth 
                                    multiline 
                                    rows={4}
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
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
                                />
                                <FormControl fullWidth>
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
                                    disabled={isTaskLimitReached}
                                >
                                    Create Task
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
                <FormControl sx={{ minWidth: 200, mb: 3 }}>
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

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr' }, gap: 2 }}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <Card 
                                key={task.id}
                                sx={{
                                    '&:hover': {
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', flex: 1 }}>
                                            {task.name}
                                        </Typography>
                                        <Chip 
                                            label={task.repeat} 
                                            color={getRepeatColor(task.repeat)}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                        {task.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            variant="outlined" 
                                            size="small"
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteTask(task.id)}
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