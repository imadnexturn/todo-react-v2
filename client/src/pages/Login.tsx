import React from 'react';
import AuthForm from '../components/feature/AuthForm';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-xy"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md">
                <AuthForm type="login" />
            </div>
        </div>
    );
};

export default Login;
