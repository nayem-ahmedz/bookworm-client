import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

// function to get Authenticated user, and auth function
export const useUserProvider = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};