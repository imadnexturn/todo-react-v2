import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/index';

export const getTodos = (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const todos = db.prepare('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC').all(userId);
        res.json(todos);
    } catch (error) {
        console.error('Get todos error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createTodo = (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const id = uuidv4();
        const insert = db.prepare('INSERT INTO todos (id, user_id, title, description) VALUES (?, ?, ?, ?)');
        insert.run(id, userId, title, description || '');

        const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Create todo error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTodo = (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;
        const { title, description, is_completed } = req.body;

        const todo: any = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, userId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const updateQuery = `
      UPDATE todos 
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          is_completed = COALESCE(?, is_completed)
      WHERE id = ?
    `;

        db.prepare(updateQuery).run(title, description, is_completed, id);
        const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

        res.json(updatedTodo);
    } catch (error) {
        console.error('Update todo error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTodo = (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;

        const result = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?').run(id, userId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Delete todo error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
