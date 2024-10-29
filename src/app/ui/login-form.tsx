"use client";

import axios from "axios";
import {useRouter} from 'next/navigation'
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await axios.post("/api/login", { email, password });
      
      if (res.data.success) {                
        await router.push('/profile');
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("_id", res.data.id);
      }

    } catch (err) {
      setErrorMessage("Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false); // Stop loading
    }
    
  }  
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6z text-gray-900 text-left">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
          </div>
        </div> 
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" 
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
        <div>
          <button type="submit"  disabled={isLoading} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading ? 'Loading...' : 'Sign in'}</button>
        </div>
      </form>
    );
  }

