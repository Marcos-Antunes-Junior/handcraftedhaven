"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/checkAuth'; 
import  LogoutButton  from '../../app/ui/logout-button';

export default function HomeTest() {
  const { isLoading } = useAuth(); // Check authentication

  const [username, setUsername] = useState<string | null>(null); // State to hold username

  useEffect(() => {
    // Check for username in localStorage after component mounts
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Display loading state until token check is complete
  }

  return (
  <>
  <h1>Welcome, {username ? username : 'Guest'}!</h1>
  <div>
  <p>Testing logout button</p>
  <LogoutButton />
  </div>
  </>

  );
}
