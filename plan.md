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

## Feature Updates
- [ ] Task 1.1: TDD - Write/Update failing test for Dashboard Header text (Assign: TDD Architect)
- [ ] Task 1.2: Implement Dashboard Header text change to pass test (Assign: TDD Implementer)

### Feature: Due Date for Todo Items
- [ ] Task B1 (TDD): Write failing test for `due_date` in `createTodo` API (Assign: TDD Architect)
- [ ] Task B2: Add `due_date TEXT` column to SQLite schema via ALTER TABLE migration (Assign: TDD Implementer)
- [ ] Task B3: Update `createTodo` controller to accept and store `due_date` (Assign: TDD Implementer)
- [ ] Task B4: Update `updateTodo` controller to accept and update `due_date` (Assign: TDD Implementer)
- [ ] Task F1 (TDD): Update `TodoItem.test.tsx` mock with `due_date`; add failing tests for display & overdue styling (Assign: TDD Architect)
- [ ] Task F2: Add `due_date?: string` to `Todo` interface in `types/index.ts` (Assign: TDD Implementer)
- [ ] Task F3 (TDD): Write failing tests for due date input in `AddTodo.test.tsx` (Assign: TDD Architect)
- [ ] Task F4: Add date picker input to `AddTodo.tsx` and pass `due_date` in API call (Assign: TDD Implementer)
- [ ] Task F5: Display `due_date` in `TodoItem.tsx` with overdue red highlight (Assign: TDD Implementer)

### Feature: Category for Todo Items (public / private)
- [ ] Task C-F1 (TDD): Update `TodoItem.test.tsx` mock with `category: 'public'`; add failing tests for category badge display (Assign: TDD Architect)
- [ ] Task C-F2 (TDD): Update `AddTodo.test.tsx`; add failing tests for category select input (renders, updates value) (Assign: TDD Architect)
- [ ] Task C-B1: Add `category TEXT DEFAULT 'public'` column to SQLite via `ALTER TABLE` migration in `db/index.ts` (Assign: TDD Implementer)
- [ ] Task C-B2: Update `createTodo` controller to accept and store `category` (Assign: TDD Implementer)
- [ ] Task C-B3: Update `updateTodo` controller to accept and update `category` (Assign: TDD Implementer)
- [ ] Task C-T1: Add `category: 'public' | 'private'` to `Todo` interface in `types/index.ts` (Assign: TDD Implementer)
- [ ] Task C-F3: Add category `<select>` to `AddTodo.tsx` and pass `category` in API call (Assign: TDD Implementer)
- [ ] Task C-F4: Display category badge in `TodoItem.tsx` with `data-testid="todo-category"` (Assign: TDD Implementer)
