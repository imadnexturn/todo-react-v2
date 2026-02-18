import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from './TodoItem';
import type { Todo } from '../../types';

describe('TodoItem Component', () => {
    const mockTodo: Todo = {
        id: '1',
        user_id: 'user1',
        title: 'Test Todo',
        description: 'This is a test description',
        priority: 'medium',
        due_date: '2026-03-01',
        is_completed: false,
        created_at: '2024-01-01T00:00:00Z'
    };

    it('renders todo title', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const titleElement = screen.getByText('Test Todo');
        expect(titleElement).toBeInTheDocument();
    });

    it('displays description when present', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const descriptionElement = screen.getByText('This is a test description');
        expect(descriptionElement).toBeInTheDocument();
    });

    it('does not display description element when description is empty', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const todoWithoutDescription = { ...mockTodo, description: '' };
        render(<TodoItem todo={todoWithoutDescription} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const descriptionElement = screen.queryByText('This is a test description');
        expect(descriptionElement).not.toBeInTheDocument();
    });

    it('does not display description element when description is undefined', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const todoWithoutDescription = { ...mockTodo, description: undefined };
        render(<TodoItem todo={todoWithoutDescription} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const descriptionElement = screen.queryByText('This is a test description');
        expect(descriptionElement).not.toBeInTheDocument();
    });

    it('applies correct styling to description (smaller text, lighter color)', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const descriptionElement = screen.getByText('This is a test description');
        expect(descriptionElement).toHaveClass('text-sm');
        expect(descriptionElement).toHaveClass('text-gray-400');
    });

    it('applies line-through to description when todo is completed', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const completedTodo = { ...mockTodo, is_completed: true };
        render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const descriptionElement = screen.getByText('This is a test description');
        expect(descriptionElement).toHaveClass('line-through');
    });

    // --- Due Date Tests ---

    it('displays due date when present', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const dueDateElement = screen.getByTestId('todo-due-date');
        expect(dueDateElement).toBeInTheDocument();
    });

    it('does not display due date when absent', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const todoWithoutDueDate = { ...mockTodo, due_date: undefined };
        render(<TodoItem todo={todoWithoutDueDate} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const dueDateElement = screen.queryByTestId('todo-due-date');
        expect(dueDateElement).not.toBeInTheDocument();
    });

    it('applies overdue styling when past due and not completed', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        // Use a date clearly in the past
        const overdueTodo = { ...mockTodo, due_date: '2020-01-01', is_completed: false };
        render(<TodoItem todo={overdueTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const dueDateElement = screen.getByTestId('todo-due-date');
        expect(dueDateElement).toHaveClass('overdue');
    });

    it('does not apply overdue styling when todo is completed even if past due', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const completedOverdueTodo = { ...mockTodo, due_date: '2020-01-01', is_completed: true };
        render(<TodoItem todo={completedOverdueTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const dueDateElement = screen.getByTestId('todo-due-date');
        expect(dueDateElement).not.toHaveClass('overdue');
    });
});
