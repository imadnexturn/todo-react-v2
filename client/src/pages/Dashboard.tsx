import React from 'react';
import { useAuth } from '../hooks/useAuth';
import TodoList from '../components/feature/TodoList';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen p-4 md:p-8">
            <header className="flex justify-between items-center max-w-2xl mx-auto mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">My Tasks</h1>
                    <p className="text-gray-400">Welcome back, {user?.username}</p>
                </div>
                <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Logout"
                >
                    <LogOut size={24} />
                </button>
            </header>

            <main>
                <TodoList />
            </main>
        </div>
    );
};

export default Dashboard;
