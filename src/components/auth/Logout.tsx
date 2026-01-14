'use client';
import { useUserProvider } from "@/hooks/useUserProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Logout({className = ''} : { className?: string }){
    const router = useRouter();
    const { logout } = useUserProvider();
    const handleLogout = async (): Promise<void> => {
            const result = await Swal.fire({
                title: "Ready to logout?",
                text: "You will need to login again!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, logout!"
            });
    
            if (result.isConfirmed) {
                try {
                    await logout();
                    router.push('/login');
                    Swal.fire({
                        title: "Logged Out!",
                        text: "You have been logged out successfully.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while logging out.",
                        icon: "error"
                    });
                }
            }
        };
    return(
        <button className={`text-base ${className}`} onClick={handleLogout}>Logout</button>
    );
}