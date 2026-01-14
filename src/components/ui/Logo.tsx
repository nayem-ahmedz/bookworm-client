import Image from "next/image";

export default function Logo({ className = '' }: { className?: string }) {
    return (
        <Image src='/logo.png' alt='bookworm logo' width={80} height={80} className={className} />
    );
}