import { getServerUser } from '@/lib/authService';
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getServerUser();
    if(!user){
        return redirect('/login');
    }
    if(user.role === 'admin'){
        return redirect('/dashboard');
    }
    return redirect('/my-library');
}