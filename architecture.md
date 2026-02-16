# System Architecture

## 1. Module Breakdown & Folder Structure

### Root Directory
- `client/` : Frontend React Application
- `server/` : Backend Express Application
- `shared/` : (Optional) Shared types if creating a distinct package, otherwise types are duplicated or symlinked. For simplicity, we will keep types in their respective folders but ensure consistency.

### Client Structure (`/client`)
Built with Vite + React + TypeScript.
```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── ui/          # Generic UI components (Button, Input, Card) - Shadcn-like
│   └── feature/     # Feature-specific components (TodoList, AuthForm)
├── layout/          # Layout components (Navbar, Sidebar)
├── pages/           # Page views (Login, Register, Dashboard)
├── hooks/           # Custom React hooks (useAuth, useTodos)
├── services/        # API service layer (Axios instances)
├── styles/          # Global styles & CSS variables
├── types/           # TypeScript interfaces
├── App.tsx          # Main App component with Routing
└── main.tsx         # Entry point
```

### Server Structure (`/server`)
Built with Node.js + Express + TypeScript (or JS with JSDoc, but user requested TS in similar contexts, `spec.md` implies Node/Express. We will use proper module separation).
```
src/
├── config/          # Configuration (env vars, consts)
├── controllers/     # Request handlers (Auth, Todos)
├── db/              # Database connection & Schema initialization
├── middleware/      # Express middleware (auth, validation, error)
├── routes/          # API route definitions
├── utils/           # Utility functions (JWT helper, password hash)
└── app.ts           # Express app setup
```

## 2. Technology Stack & Patterns

### Frontend
- **Framework:** React 18+ (Vite)
- **Language:** TypeScript
- **Styling:** CSS Modules (Scoped styling) with CSS Variables for theming.
- **State Management:** React Context + Hooks (sufficient for this scale).
- **HTTP Client:** Axios (Interceptors for auto-injecting JWT).
- **Routing:** React Router v6.

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript (ES Modules) or TypeScript. *Decision: JavaScript with CommonJS or ESM for simplicity unless TS is strictly required by user habits. User stack request just said "Node.js". We will use CommonJS for broad compatibility or ESM if possible. Let's aim for modern ES syntax.*
- **Database:** SQLite (via `better-sqlite3`).
- **Auth:** JWT (Stateless).

## 3. Data Models (Schema)

### Table: `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | TEXT (UUID) | PRIMARY KEY | Unique User ID |
| `username` | TEXT | UNIQUE, NOT NULL | Username |
| `password` | TEXT | NOT NULL | Hashed Password |
| `created_at` | TEXT | DEFAULT CURRENT_TIMESTAMP | Creation Time |

### Table: `todos`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | TEXT (UUID) | PRIMARY KEY | Unique Todo ID |
| `user_id` | TEXT | FOREIGN KEY (users.id) | Owner of the todo |
| `title` | TEXT | NOT NULL | Task Title |
| `description` | TEXT |  | Optional details |
| `is_completed` | INTEGER | DEFAULT 0 | 0=False, 1=True |
| `created_at` | TEXT | DEFAULT CURRENT_TIMESTAMP | Creation Time |

## 4. API Contracts

### Auth Routes
- `POST /api/auth/register`
    - Body: `{ username, password }`
    - 201: `{ message: "User created" }`
    - 400: `{ error: "Username exists" }`
- `POST /api/auth/login`
    - Body: `{ username, password }`
    - 200: `{ token: "jwt_string", user: { id, username } }`
    - 401: `{ error: "Invalid credentials" }`
- `GET /api/auth/me`
    - Header: `Authorization: Bearer <token>`
    - 200: `{ user: { id, username } }`

### Todo Routes
- `GET /api/todos`
    - 200: `[ { id, title, is_completed, ... }, ... ]`
- `POST /api/todos`
    - Body: `{ title, description? }`
    - 201: `{ id, title, ... }`
- `PUT /api/todos/:id`
    - Body: `{ title?, description?, is_completed? }`
    - 200: `{ id, title, is_completed, ... }` (Updated object)
- `DELETE /api/todos/:id`
    - 200: `{ message: "Todo deleted" }`

## 5. Testing Strategy
- **Backend:** `supertest` + `jest` (or `vitest`) for API integration tests.
- **Frontend:** Manual verification + `vitest` for utility functions if needed.
- **E2E:** `playwright` (optional, but good for critical flows if asked).
