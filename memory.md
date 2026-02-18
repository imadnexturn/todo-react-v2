# Project Memory

## Project Status
**Phase:** Planning — Category Field for Todo Items 🔵

## Key Decisions
- **Database:** SQLite via `better-sqlite3`. New columns added via `ALTER TABLE ... ADD COLUMN` with try/catch (same pattern used for `priority` column).
- **Auth:** JWT-based. Todos are user-scoped.
- **Frontend:** React + Vite + TypeScript + CSS Modules. No Tailwind — class names like `text-sm`, `text-gray-400`, `line-through` are custom CSS module classes.
- **Testing:** Vitest + React Testing Library. Test files use `.test.tsx` convention.
- **TDD Workflow:** Tests are written FIRST (failing), then implementation follows.

## Active Context (2026-02-18)
- **Working on:** Category field (public/private) for Todo items.
- **Backend:** Add `category TEXT DEFAULT 'public'` column to `todos` table; update `createTodo`/`updateTodo` controllers.
- **Frontend:** Add `category: 'public' | 'private'` to `Todo` type; add category `<select>` to `AddTodo.tsx`; display category badge in `TodoItem.tsx`.
- **Tests to write first (TDD Red):** `AddTodo.test.tsx` (category select renders + updates), `TodoItem.test.tsx` (category badge display).

## Completed Features
- Full-stack CRUD Todo app (React + Node/Express + SQLite)
- JWT Authentication (register, login, logout)
- Todo priority field (high/medium/low)
- Todo description field (optional)
- Dashboard header "My Todo Items"
- Login page styling improvements
- Todo due date field (optional, with overdue red highlight)

## Learned Lessons
- Do NOT use MongoDB — project uses SQLite (`better-sqlite3`).
- `better-sqlite3` returns INTEGER as number (0/1), not boolean — handle in frontend.
- Test file naming: `.test.tsx` (not `.spec.tsx`) for Vitest compatibility.
- Always run `ALTER TABLE ... ADD COLUMN` in a try/catch to handle existing columns gracefully.
