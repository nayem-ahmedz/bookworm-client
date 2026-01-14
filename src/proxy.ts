import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerUser } from './lib/authService'

export async function proxy(request: NextRequest) {
    const user = await getServerUser();
    const { pathname } = request.nextUrl;
    // Public Routes
    const isPublicRoute = pathname === '/login' || pathname === '/register';

    if (!user && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user && isPublicRoute) {
        if (user?.role === 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.redirect(new URL('/my-library', request.url));
    }

    if (pathname.startsWith('/dashboard') && user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/home',
        '/my-library/:path*',
        '/books/:path*',
        '/tutorials/:path*',
        '/dashboard/:path*',
    ],
}