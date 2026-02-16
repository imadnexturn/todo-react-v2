import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/index';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

// Define TS interfaces for DB results helper if needed, 
// for now we use 'any' or define specific shapes in the function.

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const checkUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (checkUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const id = uuidv4();

        const insertUser = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
        insertUser.run(id, username, hashedPassword);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id, username: user.username });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    // This will be handled after middleware auth injection
    // Assuming middleware adds user to req.user
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // Fetch fresh user data if needed (optional)
    const dbUser: any = db.prepare('SELECT id, username FROM users WHERE id = ?').get(user.id);

    if (!dbUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: dbUser });
};
