'use client';
import Link from 'next/link';
import { HiOutlineHome, HiExclamationCircle } from 'react-icons/hi';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] bg-base-200 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-primary opacity-20">404</h1>
                <div className="-mt-20">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-error/10 rounded-full text-error animate-bounce">
                            <HiExclamationCircle size={50} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-base-content">Page Not Found</h2>
                    <p className="text-base-content/60 mb-8 max-w-md mx-auto">
                        The link you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="btn btn-primary gap-2">
                            <HiOutlineHome size={20} />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-outline gap-2"
                        >
                            <FaArrowLeft size={14} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}