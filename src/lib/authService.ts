import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserT } from '@/types/userT';

export async function getServerUser(): Promise<UserT | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;
        const decoded = jwt.verify( token,  process.env.JWT_SECRET as string ) as UserT;
        return decoded;
    } catch (err) {
        return null;
    }
}