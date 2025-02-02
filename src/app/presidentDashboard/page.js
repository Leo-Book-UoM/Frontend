"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../presidentlayout'

export default function PresidentDashboard() {
  const [message, setMessage] = useState('');
  const router = useRouter();
 
  useEffect(() => {

    (async () => {
      try {
      const content = await fetch('http://localhost:5000/api/authuser', {
        credentials: 'include',
    });
    if (content.status === 200){
      setAuth(true);
    const data = await content.json();
    setMessage(`Hi ${content.name}`)
  }
  else {
    router.push('/login');
  }
}
  catch (error) {
    
    setMessage('You are not logged in');
  }
    }
)();
  });

  return (
    <Layout >
    <div>
      {message}
      <h1>President Dashboard</h1>
      <p>Welcome to the President's exclusive dashboard!</p>
    </div>
    </Layout>
  );
}