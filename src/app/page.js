"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import api from '@/api/authAPI';
import uri from '@/api/uri';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validate email
  const validateEmail = (email) => {
    const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegx.test(email);
  };

  // Validate password
  const validatePassword = (password) => {
    const passwordRegx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegx.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include a letter, a number, and a special character');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true)
      try {
        const response = await api.post(
          `${uri}/login`,          { email, password },
        {withCredentials: true}
      );
        if (response.status === 200){
             const userResponse = await fetch(`${uri}/authuser`, {
              credentials: "include",
            });
          
            if (userResponse.status === 200) {
                const data = await userResponse.json();
                console.log("User role:",data.roleName);
          
                if (data.roleName === "President") {
                  router.push("/presidentDashboard");
                } else if (data.roleName === "Secretary") {
                  router.push("/secretaryDashboard");
                } else if (data.roleName === "Treasure") {
                  router.push("/treasureDashboard");
                } else if (data.roleName === "Director") {
                  router.push("/directorDashboard");
                }
                else {
                    router.push("/");
                }
            }else{
              router.push("/"); 
            }
          }else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800" style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="bg-slate-900 shadow-lg rounded-lg flex overflow-hidden w-4/5 md:w-3/5 lg:w-2/2">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 relative">
          <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
          <img src="/images/loginForm-logo.png" alt="login form" className="w-3/3 h-auto object-contain" />
        </div>

        <div className="bg-white w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <div className="text-orange-500 text-3xl mb-3">
              <i className="fas fa-cubes"></i>
            </div>
            <h1 className="text-3xl text-blue-500 font-bold text-center">Leo Book</h1>
          </div>

          <h5 className="text-lg font-normal mb-6 text-gray-600 text-center">Sign into your account</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" type="submit">Login</button>
          </form>

          <a className="text-sm text-gray-500 hover:underline mb-4 text-center" href="#">Forgot password?</a>

          <div className="flex space-x-4 mt-6 justify-center">
            <a href="#" className="text-sm text-gray-500 hover:underline">Terms of use</a>
            <a href="#" className="text-sm text-gray-500 hover:underline">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}