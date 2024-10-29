"use client";

import axios from "axios";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      // Send request to logout API
      await axios.post("/api/logout");

      // Remove token from cookies
      Cookies.remove("token");

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      setErrorMessage("Logout failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout} // Handle click event
        disabled={isLoading} // Disable button when loading
        className="rounded py-2 px-4 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isLoading ? 'Loading...' : 'Logout'}
      </button>

      {/* Display error message if logout fails */}
      {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
    </div>
  );
}
