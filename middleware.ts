import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

declare var process : {
    env: {
      ACCESS_TOKEN_SECRET: string
    }
  }



export function middleware(req: { cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
  const token = req.cookies.get('token'); // Get the JWT from cookies

  // If token is not present, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token using your JWT secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return NextResponse.next(); // Proceed to the requested route
  } catch (err) {
    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply the middleware to specific paths
export const config = {
  matcher: ['/home', '/profile'], // Protect these routes
};
