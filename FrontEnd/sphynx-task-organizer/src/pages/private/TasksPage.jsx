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
import { useAuthStore } from '../../store/useAuthStore';
import { SearchField } from '@aws-amplify/ui-react';

const EMPTY_TASK = {
  name: '',
  description: '',
  dueDate: '',
  repeat: 'weekly'
};

const TasksPage = () => {
  const muiTheme = useMuiTheme();
  const { loginIncognito } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.email);

  const MAX_TASKS_PER_USER = 100;

  // source data
  const [tasks, setTasks] = useState([]);

  // UI state
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [filterRepeat, setFilterRepeat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // single task state (create + edit)
  const [task, setTask] = useState(EMPTY_TASK);
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
      setShowCreateTask(false);
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
      repeat: t.repeat
    });
    setEditingTaskId(t.taskId);
  };

  const closeEditModal = () => {
    setEditingTaskId(null);
    setTask(EMPTY_TASK);
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
                pt: 10,
                pb: 4,
                minHeight: '100vh',
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
            onClick={() => setShowCreateTask((p) => !p)}
            disabled={isLoading}
          >
            {showCreateTask ? 'Hide Create Task' : 'Show Create Task'}
          </Button>

          {/* ---------- CREATE ---------- */}
          {showCreateTask && (
            <Card
                    sx={{
                        mb: 2,
                        backgroundColor: (theme) => theme.palette.background.paper
                    }}
                >
              <CardContent>
                <form onSubmit={handleCreateTask}>
                  <TextField
                    fullWidth
                    label="Task Name"
                    value={task.name}
                    onChange={(e) => updateTaskField('name', e.target.value)}
                    required
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

                  <TextField
                    fullWidth
                    type="date"
                    label="Due Date"
                    InputLabelProps={{ shrink: true }}
                    value={task.dueDate}
                    onChange={(e) => updateTaskField('dueDate', e.target.value)}
                    required
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

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading || isTaskLimitReached}
                  >
                    {isLoading ? <CircularProgress size={22} /> : 'Create Task'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

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
                <Typography variant="body2">{t.description}</Typography>
                <Typography variant="body2">
                  Due: {new Date(t.dueDate).toLocaleDateString()}
                </Typography>

                <Chip
                  label={t.repeat}
                  color={getRepeatColor(t.repeat)}
                  sx={{ mt: 1 }}
                />

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
      <Modal open={editingTaskId !== null} onClose={closeEditModal}>
        <Box sx={{ p: 3, backgroundColor: 'background.paper', minWidth: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Task
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
            label="Description"
            value={task.description}
            onChange={(e) => updateTaskField('description', e.target.value)}
            multiline
            rows={3}
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

          <Button variant="contained" onClick={closeEditModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TasksPage;
