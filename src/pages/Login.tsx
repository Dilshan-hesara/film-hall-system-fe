import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup'; 
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required') 
    .email('Invalid email format'), 
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must be at least 6 characters'), 
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // 3. Submit Handler 
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setApiError('');

    try {
      const res = await loginUser({ email: data.email, password: data.password });

      // Save Tokens
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.user));

      // Redirect
      if (res.user.role === 'admin' || res.user.role === 'superadmin') {
        navigate('/admin/dashboard');
      } else if (res.user.role === 'receptionist') {
        navigate('/reception/reception-dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-2xl relative z-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to MKD Cinemas</p>
        </div>

        {/* API Error Message (Backend Error) */}
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={16} /> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input
                {...register('email')} //  Register Input
                type="text"
                placeholder="you@example.com"
                className={`w-full bg-gray-800 border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none transition-all
                  ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-yellow-500'}
                `}
              />
            </div>
            {/*  Validation Error Message */}
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message as string}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input
                {...register('password')} // Register Input
                type="password"
                placeholder="••••••••"
                className={`w-full bg-gray-800 border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none transition-all
                  ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-yellow-500'}
                `}
              />
            </div>
            {/* Validation Error Message */}
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message as string}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing In...' : <><LogIn size={20} /> Sign In</>}
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-yellow-500 hover:underline">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;