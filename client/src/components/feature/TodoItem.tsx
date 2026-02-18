import React from 'react';
import type { Todo } from '../../types';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, is_completed: boolean) => void;
    onDelete: (id: string) => void;
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high':
            return 'bg-red-500/20 text-red-400 border-red-500/50';
        case 'medium':
            return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
        case 'low':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
};

const isOverdue = (dueDate: string, isCompleted: boolean): boolean => {
    if (isCompleted) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
};

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className="glass-panel p-4 mb-3 flex items-center justify-between group hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={() => onToggle(todo.id, !todo.is_completed)}
                    className={`text-gray-400 hover:text-white transition-colors ${todo.is_completed ? 'text-green-500' : ''}`}
                >
                    {todo.is_completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className={`text-lg ${todo.is_completed ? 'line-through text-gray-500' : 'text-white'}`}>
                            {todo.title}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(todo.priority)}`}>
                            {todo.priority.toUpperCase()}
                        </span>
                    </div>
                    {todo.description && todo.description.trim() && (
                        <span className={`text-sm text-gray-400 ${todo.is_completed ? 'line-through' : ''}`}>
                            {todo.description}
                        </span>
                    )}
                    {todo.due_date && (
                        <span
                            data-testid="todo-due-date"
                            className={`text-xs mt-1 ${isOverdue(todo.due_date, todo.is_completed)
                                    ? 'overdue text-red-400 font-semibold'
                                    : 'text-gray-500'
                                }`}
                        >
                            Due: {formatDate(todo.due_date)}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default TodoItem;
