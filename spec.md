# Project Specification: Full-Stack Todo Application

## 1. System Overview
A full-stack Todo application allowing users to register, log in, and manage their tasks. The app emphasizes a clean, responsive UI and a robust backend API.

## 2. User Stories
### Authentication
- **As a user**, I want to register an account so I can save my todos securely.
- **As a user**, I want to log in so I can access my todos from any device.
- **As a user**, I want to log out so I can protect my account on shared devices.

### Todo Management
- **As a user**, I want to view my list of todos.
- **As a user**, I want to add a new todo with a title and description.
- **As a user**, I want to mark a todo as completed or incomplete.
- **As a user**, I want to edit a todo's details.
- **As a user**, I want to delete a todo I no longer need.
- **As a user**, I want to filter todos by status (All, Active, Completed).

## 3. Data Model (Conceptual)

### user
- `id`: UUID (Primary Key)
- `username`: String (Unique)
- `password_hash`: String
- `created_at`: DateTime

### todo
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key -> user.id)
- `title`: String
- `description`: String (Optional)
- `is_completed`: Boolean (Default: false)
- `created_at`: DateTime
- `updated_at`: DateTime

## 4. API Interface (Conceptual)

### Auth
- `POST /api/auth/register` - { username, password }
- `POST /api/auth/login` - { username, password } -> { token }
- `GET /api/auth/me` - (Protected) -> User details

### Todos
- `GET /api/todos` - List all todos for auth user
- `POST /api/todos` - { title, description } -> Create todo
- `PUT /api/todos/:id` - { title, description, is_completed } -> Update todo
- `DELETE /api/todos/:id` -> Delete todo

## 5. Technology Stack
- **Frontend:** React (Vite), TypeScript, CSS Modules
- **Backend:** Node.js, Express
- **Database:** SQLite (using `better-sqlite3`)
- **Auth:** JWT (JSON Web Tokens)
