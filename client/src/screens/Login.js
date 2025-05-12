import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div
          className="flex items-center justify-center p-4 bg-blue-500"
        >
          <h1 className="text-xl font-semibold text-white">Expense Tracker</h1>
        </div>
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-center text-gray-700">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;