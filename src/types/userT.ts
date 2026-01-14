export interface UserT {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    photoURL: string;
    iat?: number;
    exp?: number;
}