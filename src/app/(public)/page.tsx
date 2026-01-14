import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // const cookieStore = await cookies();
  // const user = cookieStore.get('user')?.value;
  // console.log(cookieStore, user);

  // if(!user) redirect('/login');

  // if(user?.role === 'admin') redirect('/dashboard');

  // redirect('/my-library');
  return(<h1>home</h1>)
}