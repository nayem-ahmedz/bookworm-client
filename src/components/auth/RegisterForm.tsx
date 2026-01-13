'use client';
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        // Use FormData to get values easily
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const name = (formData.get('name') as string).trim();
        const email = (formData.get('email') as string).trim();
        const profileImage = formData.get('profileImage') as File;
        const password = (formData.get('password') as string).trim();

        // password must be 6 characters
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        if (!profileImage) {
            toast.error("Profile image is required");
            setLoading(false);
            return;
        }
        if (!profileImage.type.startsWith('image/')) {
            toast.error("Only image files are allowed");
            setLoading(false);
            return;
        }

        // prepare formdata for image upload to imageBB
        const imageFormData = new FormData();
        imageFormData.append("image", profileImage);

        try {
            const imageResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imagebbAPI}`, {
                method: "POST",
                body: imageFormData
            });
            const imgData = await imageResponse.json();
            if (!imgData.success) {
                toast.error("Unable to upload image, try again");
                return;
            }
            const imageUrl = imgData.data.url; // ImgBB direct URL
            const userData = {
                name, email, password, photoURL: imageUrl
            };
            const response = await axiosInstance.post('/api/auth/register', userData);
            if (response.data.success) {
                form.reset();
                toast.success(response.data.message || "Registered! Please login.");
                router.push('/login');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
            console.error('Register error:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <label className="label">Name</label>
                <input name="name" type="text" className="input input-bordered w-full" placeholder="Full Name" required />
                <label className="label">Email</label>
                <input name="email" type="email" className="input input-bordered w-full" placeholder="email@example.com" required />
                <label className="label">Profile Picture</label>
                <input name="profileImage" type="file" className="file-input w-full" accept="image/*" required />
                <label className="label">Password</label>
                <input name="password" type="password" className="input input-bordered w-full" placeholder="password" required />
                <button type='submit' className="btn btn-primary mt-4" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </fieldset>
            <p className="mt-3 text-center">
                Already have a account? <Link href='/login'>Login</Link>
            </p>
        </form>
    );
}