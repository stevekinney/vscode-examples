import chalk from 'chalk';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { getDatabase } from './database.js';

const database = await getDatabase();
const server = await createServer(database);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  const url = chalk.blue(`http://localhost:${PORT}`);
  console.log(chalk.green(`Server is running on ${url}.`));
});

export async function createServer(database) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Get all tasks
  app.get('/tasks', async (req, res) => {
    const query = `SELECT * FROM tasks`;

    try {
      const tasks = await database.all(query);
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  });

  // Get a specific task
  app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const query = `SELECT * FROM tasks WHERE id = ?`;

    try {
      const task = await database.get(query, [taskId]);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      return res.json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve task' });
    }
  });

  // Create a new task
  app.post('/tasks', async (req, res) => {
    const { title, description, completed = false } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const query = `INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)`;
    try {
      await database.run(query, [title, description, completed ? 1 : 0]);
      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create task' });
    }
  });

  // Update a task
  app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    const query = `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`;

    try {
      await database.run(query, [title, description, completed ? 1 : 0, taskId]);
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update task' });
    }
  });

  // Delete a task
  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const query = `DELETE FROM tasks WHERE id = ?`;

    try {
      await database.run(query, [taskId]);
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete task' });
    }
  });

  return app;
}
