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
      priority TEXT DEFAULT 'medium',
      due_date TEXT,
      is_completed INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `;

  db.exec(createUserTable);
  db.exec(createTodoTable);

  // Add priority column to existing todos table if it doesn't exist
  try {
    db.exec(`ALTER TABLE todos ADD COLUMN priority TEXT DEFAULT 'medium'`);
    console.log('Added priority column to todos table');
  } catch (error: any) {
    // Column already exists, ignore error
    if (!error.message.includes('duplicate column name')) {
      console.error('Error adding priority column:', error);
    }
  }

  // Add due_date column to existing todos table if it doesn't exist
  try {
    db.exec(`ALTER TABLE todos ADD COLUMN due_date TEXT`);
    console.log('Added due_date column to todos table');
  } catch (error: any) {
    // Column already exists, ignore error
    if (!error.message.includes('duplicate column name')) {
      console.error('Error adding due_date column:', error);
    }
  }

  console.log('Database initialized');
};

export default db;
