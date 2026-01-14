import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-base-200">
            <section className="footer sm:footer-horizontal text-base-content p-4 md:p-6 containerr gap-6">
                <aside className="gap-0">
                    <h4 className="text-2xl">BookWorm</h4>
                    <p className="text-xl mb-2">Join in the largest book library and read</p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by BookWorm</p>
                </aside>
                <nav>
                    <h6 className="footer-title mb-0 md:mb-2">BookWorm</h6>
                    <Link href='/home' className="link link-hover">Home</Link>
                    <Link href='/home' className="link link-hover">Home</Link>
                    <Link href='/home' className="link link-hover">Home</Link>
                    <Link href='/home' className="link link-hover">Home</Link>
                </nav>
                <nav>
                    <h6 className="footer-title mb-0 md:mb-2">Quick Links</h6>
                    <Link href='/home'>Home</Link>
                    <Link href='/books'>Books</Link>
                    <Link href='/my-library'>My Library</Link>
                </nav>
                <nav>
                    <h6 className="footer-title mb-0 md:mb-2">Contact</h6>
                    <a href="mailto:nayemahmedz@proton.me" className="link link-hover flex items-center gap-2"> <MdOutlineMail className="text-xl" /> nayemahmedz@proton.me</a>
                    <div className="flex gap-3 mt-3 mb-4 md:mb-0">
                        <a className="link link-hover text-2xl" > <FaFacebook /> </a>
                        <a className="link link-hover text-2xl"> <BsTwitterX /> </a>
                        <a className="link link-hover text-2xl" href='https://github.com/nayem-ahmedz/bookworm-client' target='_blank' rel='noopener noreferrer'> <FaGithub /> </a>
                        <a className="link link-hover text-2xl"> <FaYoutube /> </a>
                    </div>
                </nav>
            </section>
        </footer>
    );
}