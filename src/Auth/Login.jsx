import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/user/login', {
        email,
        password
      });

      if (response.data.status) {
        // Login successful
        alert(response.data.message);
        // You might want to store the token in localStorage or a state management solution
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to home page or dashboard
      } else {
        // Login failed
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white m-10 shadow-2xl items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="block relative"> 
          <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="block relative"> 
          <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input 
            type="password" 
            id="password"  
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to="/forgot-password" className="text-sm text-[#7747ff]">Forgot your password?</Link>
        </div>
        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>
      </form>
      <div className="text-sm text-center mt-[1.6rem]">
        Don't have an account yet?
        <Link to="/signup"> <p className="text-sm text-[#7747ff]">Sign up for free!</p> </Link>
      </div>
    </div>
  );
}

export default Login;