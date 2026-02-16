import React, { useState } from 'react';
import api from '../../services/api';
import type { Todo } from '../../types';
import { Plus } from 'lucide-react';

interface AddTodoProps {
    onTodoAdded: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const response = await api.post('/todos', { title });
            onTodoAdded(response.data);
            setTitle('');
        } catch (error) {
            console.error('Failed to add todo', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input flex-1"
                placeholder="Add a new task..."
            />
            <button type="submit" className="btn-primary flex items-center justify-center p-3">
                <Plus size={24} />
            </button>
        </form>
    );
};

export default AddTodo;
