

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        filterRepeat: 'all',
        MAX_TASKS_PER_USER: 100,

        // Add a new task
        addTask: (task) => {
          const { tasks, MAX_TASKS_PER_USER } = get();
          if (tasks.length >= MAX_TASKS_PER_USER) {
            throw new Error(`Task limit of ${MAX_TASKS_PER_USER} reached`);
          }
          set((state) => ({
            tasks: [
              ...state.tasks,
              {
                id: state.tasks.length + 1,
                ...task,
                createdAt: new Date().toISOString(),
              },
            ],
          }));
        },

        // Delete a task by ID
        deleteTask: (taskId) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          }));
        },

        // Update a task
        updateTask: (taskId, updates) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
          }));
        },

        // Get all tasks
        getTasks: () => get().tasks,

        // Get filtered tasks
        getFilteredTasks: () => {
          const { tasks, filterRepeat } = get();
          if (filterRepeat === 'all') return tasks;
          return tasks.filter((task) => task.repeat === filterRepeat);
        },

        // Set filter
        setFilterRepeat: (filter) => {
          set({ filterRepeat: filter });
        },

        // Get task count
        getTaskCount: () => get().tasks.length,

        // Check if task limit is reached
        isTaskLimitReached: () => {
          const { tasks, MAX_TASKS_PER_USER } = get();
          return tasks.length >= MAX_TASKS_PER_USER;
        },

        // Get remaining task slots
        getRemainingSlots: () => {
          const { tasks, MAX_TASKS_PER_USER } = get();
          return MAX_TASKS_PER_USER - tasks.length;
        },

        // Clear all tasks
        clearTasks: () => {
          set({ tasks: [] });
        },

        // Initialize with mock data
        initializeMockTasks: (mockTasks) => {
          set({ tasks: mockTasks });
        },
      }),
      {
        name: 'task-store',
        version: 1,
      }
    )
  )
);

export default useTaskStore;
