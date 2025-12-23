import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Modal
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { createTask } from '../../api/CreateTask';
import { getAllTasks } from '../../api/GetTasks';
import { deleteTask } from '../../api/DeleteTask';
import { updateTask } from '../../api/UpdateTask';
import { useAuthStore } from '../../store/useAuthStore';
import { SearchField } from '@aws-amplify/ui-react';

const EMPTY_TASK = {
  name: '',
  dueDate: '',
  location: '',
  description: '',
  repeat: 'weekly',
  visibility: 'private',
  notificationDate: '',
  notificationTime: ''
};

const visibilityStates = ['Private', 'Friends', 'Public'];

const TasksPage = () => {
  const muiTheme = useMuiTheme();
  const { loginIncognito } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.email);

  const MAX_TASKS_PER_USER = 100;

  // source data
  const [tasks, setTasks] = useState([]);

  // UI state
  const [filterRepeat, setFilterRepeat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // single task state (create + edit)
  const [task, setTask] = useState(EMPTY_TASK);
  const [creatingTask, setCreatingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  /* -------------------- helpers -------------------- */

  const updateTaskField = (field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const getRepeatColor = (repeat) => {
    const colors = {
      daily: 'error',
      weekly: 'primary',
      monthly: 'info',
      yearly: 'success'
    };
    return colors[repeat] || 'default';
  };

  /* -------------------- derived data -------------------- */

  const filteredTasks = tasks.filter((t) => {
    const matchesRepeat =
      filterRepeat === 'all' || t.repeat === filterRepeat;

    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery);

    return matchesRepeat && matchesSearch;
  });

  const isTaskLimitReached = tasks.length >= MAX_TASKS_PER_USER;
  const tasksRemaining = MAX_TASKS_PER_USER - tasks.length;

  /* -------------------- CRUD -------------------- */

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedTasks = await getAllTasks(userId);
      setTasks(fetchedTasks || []);
    } catch {
      setError('Failed to load tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    if (isTaskLimitReached) {
      setError(`Task limit of ${MAX_TASKS_PER_USER} reached.`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        userId,
        ...task
      };

      const result = await createTask(payload);
      setTasks((prev) => [...prev, result.item]);

      setTask(EMPTY_TASK);
      setCreatingTask(false);
    } catch {
      setError('Failed to create task.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      await deleteTask(userId, taskId);
      setTasks((prev) => prev.filter((t) => t.taskId !== taskId));
    } catch {
      setError('Failed to delete task.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (t) => {
    setTask({
      name: t.name,
      description: t.description,
      dueDate: t.dueDate,
      repeat: t.repeat,
      location: t.location,
      visibility: t.visibility,
      notificationDate: t.notificationDate,
      notificationTime: t.notificationTime
    });
    setEditingTaskId(t.taskId);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!userId || !editingTaskId) {
      setError('User or task not found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateTask(userId, editingTaskId, task);
      
      setTasks((prev) =>
        prev.map((t) =>
          t.taskId === editingTaskId ? { ...t, ...task } : t
        )
      );

      closeEditModal();
    } catch {
      setError('Failed to update task.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeEditModal = () => {
    setEditingTaskId(null);
    setTask(EMPTY_TASK);
    setCreatingTask(false);
  };

  /* -------------------- effects -------------------- */

  useEffect(() => {
    if (!userId) loginIncognito();
  }, [userId, loginIncognito]);

  useEffect(() => {
    if (userId) loadTasks();
  }, [userId]);

  /* -------------------- render -------------------- */

  return (
    <>

      <Box
            sx={{
                pb: 4,
                minHeight: 'auto',
                backgroundColor: (theme) => theme.palette.background.default
            }}
        >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Tasks Page
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" sx={{ mb: 2 }}>
            Tasks remaining: {tasksRemaining}
          </Typography>

          <Button
            variant="contained"
            sx={{ mb: 3 }}
            onClick={() => setCreatingTask(true)}
            disabled={isLoading}
          >
            Create Task
          </Button>

          {/* ---------- FILTERS ---------- */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Repeat</InputLabel>
              <Select
                value={filterRepeat}
                label="Filter by Repeat"
                onChange={(e) => setFilterRepeat(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
              <Box
                sx={{
                    width: 320,
                    '& input': {
                    height: '40px',
                    padding: '0 14px',
                    fontSize: '0.875rem',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                        ? theme.palette.background.paper
                        : theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                    borderRadius: 1
                    },
                    '& input::placeholder': {
                    color: (theme) => theme.palette.text.secondary
                    },
                    '& button': {
                    color: (theme) => theme.palette.text.secondary
                    }
                }}
                >
                <SearchField
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                    onClear={() => setSearchQuery('')}
                />
                </Box>


          </Box>

          {/* ---------- LIST ---------- */}
          {filteredTasks.map((t) => (
            <Card key={t.taskId} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{t.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{t.description}</Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Due:</strong> {new Date(t.dueDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {t.location || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Visibility:</strong> {t.visibility ? t.visibility.charAt(0).toUpperCase() + t.visibility.slice(1) : 'N/A'}
                  </Typography>
                  {t.notificationDate && (
                    <Typography variant="body2">
                      <strong>Notification:</strong> {new Date(t.notificationDate).toLocaleDateString()} {t.notificationTime || ''}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={t.repeat}
                    color={getRepeatColor(t.repeat)}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditTask(t)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteTask(t.taskId)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Box>

      {/* ---------- EDIT MODAL ---------- */}
      <Modal open={editingTaskId !== null || creatingTask} onClose={closeEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 3,
            backgroundColor: 'background.paper',
            minWidth: 400,
            borderRadius: 2,
            boxShadow: 24
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingTaskId !== null ? 'Edit Task' : 'Create Task'}
          </Typography>

          <TextField
            fullWidth
            label="Task Name"
            value={task.name}
            onChange={(e) => updateTaskField('name', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={(e) => updateTaskField('dueDate', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="text"
            label="Location"
            value={task.location}
            onChange={(e) => updateTaskField('location', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            value={task.description}
            onChange={(e) => updateTaskField('description', e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />  

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Repeat</InputLabel>
            <Select
              value={task.repeat}
              label="Repeat"
              onChange={(e) => updateTaskField('repeat', e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={task.visibility}
              label="Visibility"
              onChange={(e) => updateTaskField('visibility', e.target.value)}
            >
              {visibilityStates.map((state) => (
                <MenuItem key={state} value={state.toLowerCase()}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            label="Notification Date"
            InputLabelProps={{ shrink: true }}
            value={task.notificationDate}
            onChange={(e) => updateTaskField('notificationDate', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="time"
            label="Notification Time"
            InputLabelProps={{ shrink: true }}
            value={task.notificationTime}
            onChange={(e) => updateTaskField('notificationTime', e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={editingTaskId !== null ? handleUpdateTask : handleCreateTask}
              disabled={isLoading}
            >
              {editingTaskId !== null ? 'Update' : 'Create'}
            </Button>
            <Button variant="outlined" onClick={closeEditModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TasksPage;
