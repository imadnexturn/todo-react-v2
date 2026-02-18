import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddTodo from './AddTodo';

describe('AddTodo Component', () => {
    it('renders input field and add button', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const inputElement = screen.getByPlaceholderText('Add a new task...');
        expect(inputElement).toBeInTheDocument();

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const inputElement = screen.getByPlaceholderText('Add a new task...');
        fireEvent.change(inputElement, { target: { value: 'New Task' } });

        expect(inputElement).toHaveValue('New Task');
    });

    it('renders description textarea field', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const descriptionElement = screen.getByPlaceholderText('Description (optional)...');
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement.tagName).toBe('TEXTAREA');
    });

    it('updates description value on change', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const descriptionElement = screen.getByPlaceholderText('Description (optional)...');
        fireEvent.change(descriptionElement, { target: { value: 'Buy milk and eggs' } });

        expect(descriptionElement).toHaveValue('Buy milk and eggs');
    });

    // --- Due Date Tests ---

    it('renders due date input field', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const dueDateInput = screen.getByLabelText('Due Date (optional)');
        expect(dueDateInput).toBeInTheDocument();
        expect(dueDateInput).toHaveAttribute('type', 'date');
    });

    it('updates due date value on change', () => {
        const mockOnTodoAdded = vi.fn();
        render(<AddTodo onTodoAdded={mockOnTodoAdded} />);

        const dueDateInput = screen.getByLabelText('Due Date (optional)');
        fireEvent.change(dueDateInput, { target: { value: '2026-03-15' } });

        expect(dueDateInput).toHaveValue('2026-03-15');
    });
});
