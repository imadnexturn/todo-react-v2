import React, { useState } from 'react';
import api from '../../services/api';
import type { Todo } from '../../types';
import { Plus } from 'lucide-react';

interface AddTodoProps {
    onTodoAdded: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const response = await api.post('/todos', {
                title,
                description,
                priority,
                due_date: dueDate || undefined,
            });
            onTodoAdded(response.data);
            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
        } catch (error) {
            console.error('Failed to add todo', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Add a new task..."
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                    className="glass-input px-3"
                    style={{ width: '120px' }}
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit" className="btn-primary flex items-center justify-center p-3 border-2 border-white">
                    <Plus size={24} />
                </button>
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                placeholder="Description (optional)..."
                rows={2}
            />
            <div className="flex items-center gap-2">
                <label
                    htmlFor="due-date-input"
                    className="text-sm text-gray-400 whitespace-nowrap"
                >
                    Due Date (optional)
                </label>
                <input
                    id="due-date-input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                />
            </div>
        </form>
    );
};

export default AddTodo;
