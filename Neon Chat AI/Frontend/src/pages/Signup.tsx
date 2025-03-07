
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';

const Signup = () => {
  const { register, isLoading } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-page-in">
        <div className="glass-morphism p-8 rounded-xl shadow-neon-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold neon-text mb-2">Create Account</h2>
            <p className="text-white/70">Sign up to start chatting</p>
          </div>

          <AuthForm type="register" onSubmit={register} isLoading={isLoading} />

          <div className="mt-6 text-center text-sm">
            <span className="text-white/70">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-neon-cyan hover:text-white transition-colors duration-300"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
