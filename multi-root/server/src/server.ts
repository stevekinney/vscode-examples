import express, { type Request, type Response } from 'express';
import type { Database } from 'sqlite';
import cors from 'cors';

export async function createServer(database: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/tasks', async (req: Request, res: Response) => {
    const query = `SELECT * FROM tasks`;

    try {
      const tasks = await database.all(query);
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
  });

  // Get a specific task
  app.get('/tasks/:id', async (req: Request, res: Response) => {
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
  app.post('/tasks', async (req: Request, res: Response) => {
    const { title, description, completed = false } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const query = `INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)`;

    await database.run(query, [title, description, completed ? 1 : 0]);
    return res.sendStatus(201);
  });

  // Update a task
  app.put('/tasks/:id', async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    const query = `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`;

    await database.run(query, [title, description, completed ? 1 : 0, taskId]);
    return res.sendStatus(200);
  });

  // Delete a task
  app.delete('/tasks/:id', async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const query = `DELETE FROM tasks WHERE id = ?`;

    await database.run(query, [taskId]);
    return res.sendStatus(200);
  });

  return app;
}
