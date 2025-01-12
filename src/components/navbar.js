import React from 'react'

const Navbar = () =>{
    return(
        <nav className='flex justify-between items-center p-4 bg-white shadow '>
            <div className='flex items-center '>
                <img src='/logo.png' alt='Logo' className='w-10 h-10 mr-4' />
                <h1 className='text-xl font-bold'>Projects</h1>
            </div>
            <div className='flex items-center space-x-6'>
                <a href='#' className='text-gray-600'>Profile</a>
                <a href='#' className='text-gray-600'>Profile</a>
                <a href='#' className='text-gray-600'>Profile</a>
            </div>
            <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">5</span>
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-bell"></i>
          </button>
        </div>
        <button className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">P2</button>
      </div>
        </nav>
    );
};

export default Navbar;