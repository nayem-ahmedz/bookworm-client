import { UserT } from "@/types/userT";
import { createContext } from "react";

interface UserContextType {
    currentUser: UserT | null;
    loading: boolean;
    setCurrentUser: (user: UserT | null) => void;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);