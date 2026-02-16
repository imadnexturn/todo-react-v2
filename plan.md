# Implementation Plan

## Phase 1: Project Setup
- [ ] Initialize Git repository
- [ ] Create directory structure: `server/` and `client/`
- [ ] Initialize `server` (Node/Express, install `express`, `better-sqlite3`, `bcrypt`, `jsonwebtoken`, `cors`, `dotenv`)
- [ ] Initialize `client` (Vite + React + TS, install `react-router-dom`, `axios`)

## Phase 2: Backend Core
- [ ] Setup Express server with basic middleware (cors, json body parser)
- [ ] Setup SQLite database connection and helper class
- [ ] Create Database initialization script (create tables if not exist)
- [ ] Implement `POST /api/auth/register` (hash password, save user)
- [ ] Implement `POST /api/auth/login` (verify password, sign JWT)
- [ ] Implement Auth middleware (verify JWT, attach user to request)

## Phase 3: Backend Features (Todos)
- [ ] Implement `GET /api/todos`
- [ ] Implement `POST /api/todos`
- [ ] Implement `PUT /api/todos/:id`
- [ ] Implement `DELETE /api/todos/:id`
- [ ] Test API endpoints manually or with check script

## Phase 4: Frontend Core
- [ ] Setup React Router (`react-router-dom`)
- [ ] Setup Global Styles (CSS Variables for theme)
- [ ] Create `api.ts` client (Axios instance with interceptors for Auth header)
- [ ] Create Auth Context / Hook (`useAuth`) to manage token and user state

## Phase 5: Frontend Features
- [ ] Build Login / Register Pages
    - [ ] Create reusable form components (Input, Button) with CSS Modules
- [ ] Build Todo Dashboard
    - [ ] Create Todo List component
    - [ ] Create Todo Item component
    - [ ] Create Add Todo component
- [ ] Implement Todo interactions (Add, Toggle, Delete, Edit)
- [ ] Implement Filter UI (All/Active/Completed)

## Phase 6: Polish & UI/UX
- [ ] Add loading states and error handling (toast notifications?)
- [ ] Improve styling (transitions, responsive layout)
- [ ] Final manual verification walk-through
