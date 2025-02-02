
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../mainlayout';

export default function PresidentDashboard() {
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {

    (async () => {
      try {
      const content = await fetch('http://localhost:5000/api/authuser', {
        credentials: 'include',
    });
    if (content.status === 200){
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
    <Layout auth={auth}>
    <div>
      {message}
      <h1>President Dashboard</h1>
      <p>Welcome to the President's exclusive dashboard!</p>
      <button
        onClick={() => {
          localStorage.removeItem('roleName');
          router.push('/login');
        }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        Logout
      </button>
    </div>
    </Layout>
  );
}