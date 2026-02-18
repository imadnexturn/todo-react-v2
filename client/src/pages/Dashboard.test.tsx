import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';


// Mock the useAuth hook
vi.mock('../hooks/useAuth', () => ({
    useAuth: () => ({
        user: { username: 'testuser' },
        logout: vi.fn(),
    }),
}));

// Mock TodoList component to avoid cluttering the test
vi.mock('../components/feature/TodoList', () => ({
    default: () => <div data-testid="todo-list">TodoList</div>,
}));

describe('Dashboard Component', () => {
    it('renders the correct header text', () => {
        render(<Dashboard />);
        // This expectation is intentional to fail first (TDD)
        // Current text is "My Tasks", we want "My Todo Items"
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Todo Items');
    });
});
