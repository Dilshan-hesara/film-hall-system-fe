import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        username,
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      
      navigate('/'); 
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Sign Up</h1>
        <p className="text-center mb-6 text-gray-400">Create your account to book tickets</p>

        {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;