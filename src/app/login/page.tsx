"use client";
import LoginForm from '../ui/login-form';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
 


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    const token = Cookies.get('token'); // Get JWT from cookies

    if (token) {
      router.push('/'); // Redirect to login if no token is found
    } else {
      setIsLoading(false); // Stop loading when token exists
    }
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Display loading state until token check is complete
  }
  
  return (
  <>
  <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <Image
  className="mx-auto h-16 w-auto"
  src="/logo_handcraftedhaven.png" 
  alt="Handcrafted Haven logo"
  width={300} 
  height={300} 
/>

    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-950">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <LoginForm />

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?{" "} 
      <Link href="/signup">
      Create your account
      </Link>
    </p>
  </div>

      </main>
      </>
       
    );
  }