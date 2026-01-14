'use client';
import { useUserProvider } from "@/hooks/useUserProvider";
import { navLinkT } from "@/types/navLinkT";
import Link from "next/link";
import Logout from "../auth/Logout";
import Logo from "../ui/Logo";

export default function Header() {
    const navLinks: navLinkT[] = [
        { id: 1, text: 'Home', url: '/home' },
        { id: 2, text: 'Books', url: '/books' },
        { id: 3, text: 'My Library', url: '/my-library' },
        { id: 4, text: 'Tutorials', url: '/tutorials' }
    ];
    const { loading, currentUser } = useUserProvider();
    return (
        <header className="bg-base-100 shadow-sm">
            <div className="navbar containerr">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navLinks.map(link => <li key={link.id}>
                                    <Link href={link.url} className="text-base"> {link.text} </Link>
                                </li>)
                            }
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">BookWorm</a> */}
                    <Link href='/home' className="btn btn-ghost text-xl">
                        <Logo className="w-12 md:w-14" />
                        BookWorm
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks.map(link => <li key={link.id}>
                                <Link href={link.url} className="text-base"> {link.text} </Link>
                            </li>)
                        }
                    </ul>
                </div>
                <div className="navbar-end pr-2">
                    {
                        // loading status on auth fething, if user show profile menue else show login
                        loading ? <span className="loading loading-dots loading-xl"></span> :
                            currentUser
                                ? <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={currentUser?.photoURL} alt={currentUser?.name} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={-1}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><Link className="text-base" href='/dashboard'>Dashboard</Link></li>
                                        <li> <Logout /> </li>
                                    </ul>
                                </div> : <Link href='/login' className="text-base btn btn-primary btn-outline">
                                    Login
                                </Link>
                    }
                </div>
            </div>
        </header>
    );
}