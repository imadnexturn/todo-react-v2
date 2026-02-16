import Database from 'better-sqlite3';
import { DB_PATH } from '../config';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../', DB_PATH);
const db = new Database(dbPath);

export const initializeDB = () => {
    const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;

    const createTodoTable = `
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT NOT NULL,
      description TEXT,
      is_completed INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `;

    db.exec(createUserTable);
    db.exec(createTodoTable);
    console.log('Database initialized');
};

export default db;
