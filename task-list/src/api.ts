import { PartialTask, Task } from './types';

const API_URL = 'http://localhost:3000';

// Get all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return await response.json();
};

// Get a single task by ID
export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }

  return await response.json();
};

// Create a new task
export const createTask = async (task: PartialTask): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }
};

// Update a task
export const updateTask = async (
  id: string,
  task: PartialTask,
): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
