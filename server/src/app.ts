import express from 'express';
import cors from 'cors';
import { initializeDB } from './db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database
initializeDB();

console.log('AuthRoutes type:', typeof authRoutes);
console.log('AuthRoutes content:', authRoutes);

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Todo API is running');
});

export default app;
