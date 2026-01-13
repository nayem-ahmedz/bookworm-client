import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral">
            <section className="footer footer-horizontal footer-center text-primary-content p-10 gap-4 md:gap-6">
                <aside>
                    <div className="font-bold">
                        <h3 className="text-2xl">BookWorm</h3>
                        <p>Join in the largest book library and read</p>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <div className="grid grid-flow-col gap-4">
                        <Link href='/home'>Home</Link>
                        <Link href='/books'>Books</Link>
                        <Link href='/my-library'>My Library</Link>
                    </div>
                </nav>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by BookWorm</p>
            </section>
        </footer>
    );
}