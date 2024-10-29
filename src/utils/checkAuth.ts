import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // For handling cookies

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); // Get JWT from cookies

    if (!token) {
      router.push('/login'); // Redirect to login if no token is found
    } else {
      setIsLoading(false); // Stop loading when token exists
    }
  }, [router]);

  return { isLoading }; // Return loading state
};

