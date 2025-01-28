import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login form using Tailwind CSS in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-800" style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="bg-slate-900 shadow-lg rounded-lg flex overflow-hidden w-4/5 md:w-3/5 lg:w-1/2">
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 relative">
            <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
            <img 
              src="/images/loginForm-logo.png" 
              alt="login form" 
              className="w-3/3 h-auto object-contain" 
            />
          </div>

          <div className=" bg-white w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center mb-6">
              <div className="text-orange-500 text-3xl mb-3">
                <i className="fas fa-cubes"></i>
              </div>
              <h1 className="text-3xl text-blue-500 font-bold text-center ">Leo Book</h1>
            </div>

            <h5 className="text-lg font-normal mb-6 text-gray-600 text-center">Sign into your account</h5>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Email address</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>

            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4">Login</button>

            <a className="text-sm text-gray-500 hover:underline mb-4 text-center" href="#">Forgot password?</a>

            <p className="text-sm text-gray-600 text-center">Don't have an account? <a href="#" className="text-orange-500 hover:underline">Register here</a></p>

            <div className="flex space-x-4 mt-6 justify-center">
              <a href="#" className="text-sm text-gray-500 hover:underline">Terms of use</a>
              <a href="#" className="text-sm text-gray-500 hover:underline">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}