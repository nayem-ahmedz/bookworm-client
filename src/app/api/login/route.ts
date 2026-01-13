import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!data.success) {
            return NextResponse.json(data, { status: 401 });
        }

        // Set httpOnly Cookie
        const cookieStore = await cookies();
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60, // 24 hours
            path: '/',
        });

        return NextResponse.json({ success: true, user: data.user });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal Error" }, { status: 500 });
    }
}