import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ success: false, user: null }, { status: 401 });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.json({ success: true, user });
    } catch (err) {
        return NextResponse.json({ success: false, user: null }, { status: 401 });
    }
}