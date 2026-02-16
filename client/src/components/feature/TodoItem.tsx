import React from 'react';
import type { Todo } from '../../types';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, is_completed: boolean) => void;
    onDelete: (id: string) => void;
}

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
                <span className={`text-lg ${todo.is_completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {todo.title}
                </span>
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
