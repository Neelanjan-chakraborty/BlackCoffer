
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-page-in">
        <div className="glass-morphism p-8 rounded-xl shadow-neon-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold neon-text mb-2">Welcome Back</h2>
            <p className="text-white/70">Sign in to continue to NeonChat</p>
          </div>

          <AuthForm type="login" onSubmit={login} isLoading={isLoading} />

          <div className="mt-6 text-center text-sm">
            <span className="text-white/70">Don't have an account? </span>
            <Link
              to="/signup"
              className="font-medium text-neon-cyan hover:text-white transition-colors duration-300"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
