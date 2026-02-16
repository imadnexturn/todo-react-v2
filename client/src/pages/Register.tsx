import React from 'react';
import AuthForm from '../components/feature/AuthForm';

const Register: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <AuthForm type="register" />
        </div>
    );
};

export default Register;
