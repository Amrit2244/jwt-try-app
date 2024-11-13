import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("Middleware is running for:", request.url);  // Check if middleware is triggered

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    console.log("Token found in middleware:", token);

    if (!token) {
        console.log("No token found. Redirecting to /login.");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log("Token exists, allowing access.");
    return NextResponse.next();
}

// Apply middleware to /protected routes
export const config = {
    matcher: '/protected/:path*',
};
    