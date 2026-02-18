import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Todo } from '../../types';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await api.get('/todos');
            // Ensure specific structure mapping if needed, but API returns array of objects matching interface roughly
            const data = response.data.map((t: any) => ({
                ...t,
                is_completed: Boolean(t.is_completed) // Ensure boolean
            }));
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (newTodo: Todo) => {
        setTodos([newTodo, ...todos]);
    };

    const handleToggle = async (id: string, is_completed: boolean) => {
        try {
            // Optimistic update
            setTodos(todos.map(t => t.id === id ? { ...t, is_completed } : t));
            await api.put(`/todos/${id}`, { is_completed: is_completed ? 1 : 0 }); // Send 1/0 to server if needed, or just boolean if server handles it.
            // Server helper might handle it, let's check server... server UPDATE query uses placeholders.
        } catch (error) {
            console.error('Failed to update todo', error);
            fetchTodos(); // Revert on error
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setTodos(todos.filter(t => t.id !== id));
            await api.delete(`/todos/${id}`);
        } catch (error) {
            console.error('Failed to delete todo', error);
            fetchTodos();
        }
    };

    const filteredTodos = todos.filter(t => {
        if (filter === 'active') return !t.is_completed;
        if (filter === 'completed') return t.is_completed;
        return true;
    });

    if (loading) return <div className="text-center text-gray-400 mt-10">Loading tasks...</div>;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AddTodo onTodoAdded={handleAdd} />

            <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-3 border border-gray-600 rounded-md ${filter === 'all' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`pb-2 px-3 border border-gray-600 rounded-md ${filter === 'active' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`pb-2 px-3 border border-gray-600 rounded-md ${filter === 'completed' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Completed
                </button>
            </div>

            <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">No tasks found.</div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
