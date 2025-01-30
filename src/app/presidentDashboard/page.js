'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PresidentDashboard = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Check if the user has the role 'President'
    const role = localStorage.getItem('roleName');

    // If not 'President', redirect to login page
    if (role !== 'President') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>President Dashboard</h1>
      <p>Welcome to the President's exclusive dashboard!</p>
    </div>
  );
};

export default PresidentDashboard;
