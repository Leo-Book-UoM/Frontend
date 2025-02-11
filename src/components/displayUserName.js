import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

function displayUserName({userName}) {
  return (
    <h1 className='text-3xl font-bold text-indigo-600'>
        <Typewriter words={[`Hi, ${userName}!`]} loop ={1} typeSpeed={150} />
    </h1>
  );
};

export default displayUserName;