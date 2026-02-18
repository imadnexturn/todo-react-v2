export interface User {
    id: string;
    username: string;
}

export interface Todo {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    priority: 'high' | 'medium' | 'low';
    due_date?: string; // ISO date string e.g. "2026-03-01", optional
    is_completed: boolean; // boolean from server (sqlite sends 0/1 but better-sqlite3 handles types? actually request/response shapes matter)
    // Check API response: `is_completed` is integer in SQLite but we might want boolean in frontend.
    // Actually better-sqlite3 returns number for INTEGER.
    // We'll handle conversion or just treat as number (0/1). Let's use number to be safe with raw sqlite response, or boolean if we transform it.
    // Let's assume number for now as per schema (0/1).
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
