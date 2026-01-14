'use client';
import { useUserProvider } from "@/hooks/useUserProvider";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [ loading, setLoading ] = useState(false);
        const router = useRouter();
        const { setCurrentUser } = useUserProvider();
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
            setLoading(true);
    
            // Use FormData to get values easily
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            const email = (formData.get('email') as string).trim();
            const password = (formData.get('password') as string).trim();
    
            try {
                const response = await axiosInstance.post('/api/login', { email, password });
                if (response.data.success) {
                    toast.success(response.data.message || "Login Successful!");
                    setCurrentUser(response.data.user);
                    form.reset();
                    // router.push(response.data.user.role === 'admin' ? '/dashboard' : '/library');
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Invalid credentials";
                toast.error(errorMessage);
                console.error('Login error:', error);
            } finally {
                setLoading(false);
            }
        };
    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input w-full" placeholder="Email" name='email' required />
                <label className="label">Password</label>
                <input type="password" className="input w-full" placeholder="Password" name='password' required />
                <button type='submit' className="btn btn-primary mt-4">
                    {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                </button>
            </fieldset>
            <p className="mt-3 text-center">
                Dont have a account? <Link href='/register'>Register</Link>
            </p>
        </form>
    );
}