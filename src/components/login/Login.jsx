import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook to programmatically navigate to different routes

  const loginCredentials = async (event) => {
    event.preventDefault();
  
    const loginData = {
      student_username: username,
      student_password: password,
    };
  
    if (username === 'admin' && password === 'admin') {
      navigate('/AdminPage');
    } else {
      try {
        const response = await fetch('http://localhost:8080/registration/get_user_credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
  
          if (data === true) {
            navigate('/Attendance', { state: { username } });
        } else {
            navigate('/');
            console.log('Invalid login credentials');
        }
        
        } else {
          console.log('Error:', response.statusText);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center max-w-sm p-8 border border-slate-200 rounded-lg shadow-lg bg-gradient-to-r from-red-400 to-orange-500">
      <h1 className="text-3xl font-extrabold text-white mb-6">LOGIN</h1>
      <form onSubmit={loginCredentials}>
        <input
          type="text"
          className="w-full mb-4 p-3 text-center bg-white rounded-lg shadow-md outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-6 p-3 text-center bg-white rounded-lg shadow-md outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-3 px-7 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300" type="submit">
          LOGIN
        </button>
      </form>
      <p>Don't have an account? <NavLink to="/SignIn" className="text-white hover:text-blue-300">Register</NavLink></p>
    </div>
  );
}

export default Login;
