import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { getServerUser } from "@/lib/authService";
import { dashNavLinkT } from "@/types/dashNavLinkT";
import {
    RiDashboardFill,
    RiBook3Fill,
    RiUserSettingsFill,
    RiPriceTag3Fill,
    RiStarFill,
    RiYoutubeFill,
} from "react-icons/ri";
import Logout from "@/components/auth/Logout";

export default async function PublicRoot({ children }: { children: React.ReactNode }) {
    const currentUser = await getServerUser();
    console.log(currentUser);
    const navLinks: dashNavLinkT[] = [
        { id: 1, text: "Dashboard", url: "/dashboard/home", icon: RiDashboardFill },
        { id: 2, text: "Manage Books", url: "/dashboard/manage-books", icon: RiBook3Fill },
        { id: 3, text: "Manage Genres", url: "/dashboard/genres", icon: RiPriceTag3Fill },
        { id: 4, text: "Manage Users", url: "/dashboard/users", icon: RiUserSettingsFill },
        { id: 5, text: "Moderate Reviews", url: "/dashboard/reviews", icon: RiStarFill },
        { id: 6, text: "Manage Tutorials", url: "/dashboard/tutorials", icon: RiYoutubeFill },
    ];
    return (
        <main className="containerr2">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300 gap-3">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <FaBars />
                        </label>
                        <div className="px-4 grow">Dashboard</div>
                        <div>
                            <Link href='/' className="btn btn-secondary btn-outline">Exit Dashboard</Link>
                        </div>
                        <div> <Logout className="btn btn-secondary" /> </div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">
                        {
                            children
                        }
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base mb-4">
                                <div className="avatar justify-center cursor-default hover:bg-transparent">
                                    <div className="w-6 is-drawer-open:w-20 rounded">
                                        <Image src={currentUser?.photoURL || '/avatar.png'} alt={currentUser?.name || 'user avatar'} width={200} height={200} />
                                    </div>
                                </div>
                                <div className="is-drawer-close:hidden flex flex-col gap-0 cursor-default hover:bg-transparent">
                                    <h2 className="text-2xl">{currentUser?.name}</h2>
                                    <p>User</p>
                                </div>
                            </li>
                            {
                                navLinks.map(link => {
                                    const Icon = link.icon;
                                    return (
                                        <li key={link.id}>
                                            <Link href={link.url} className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base lg:text-xl" data-tip="Homepage">
                                                <Icon />
                                                <span className="is-drawer-close:hidden lg:text-lg"> {link.text} </span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}