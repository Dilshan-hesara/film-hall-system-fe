import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/auth'; 
// import { useAuth } from '../context/authContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
      email,
      password,
    });


    const { accessToken, refreshToken, user } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // login(user, accessToken); 

      // Redirect
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  } catch (err: any) {
    console.error("Login Error:", err);
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;