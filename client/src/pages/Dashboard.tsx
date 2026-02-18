import React from 'react';
import { useAuth } from '../hooks/useAuth';
import TodoList from '../components/feature/TodoList';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen p-4 md:p-8">
            <header className="flex justify-between items-center max-w-2xl mx-auto mb-8 bg-blue-100 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900">My Todo Items</h1>
                    <p className="text-blue-700">Welcome back, {user?.username}</p>
                </div>
                <button
                    onClick={logout}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
                    title="Logout"
                >
                    <span>Logout</span>
                    <LogOut size={18} />
                </button>
            </header>

            <main>
                <TodoList />
            </main>
        </div>
    );
};

export default Dashboard;
