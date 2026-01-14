'use client';
import { axiosInstance } from "@/lib/axios";
import { UserT } from "@/types/userT";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";


export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<UserT | null>(null);
    const [loading, setLoading] = useState(true);

    // Restore login from cookie
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/api/auth");
                if (res.data.success) {
                    setCurrentUser(res.data.user);
                } else {
                    setCurrentUser(null);
                }
            } catch (err: any) {
                if (err.response?.status !== 401) {
                    console.error("Fetch user failed:", err);
                }
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await axiosInstance.post('/api/logout');
            setCurrentUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <UserContext value={{ currentUser, setCurrentUser, loading, logout }}>
            {
                children
            }
        </UserContext>
    );
}