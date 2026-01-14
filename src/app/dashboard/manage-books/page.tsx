'use client';
import Image from "next/image";
import Link from "next/link";
import { bookT } from "@/types/book";
import { axiosInstance } from "@/lib/axiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function ManageBooksPage() {
    const { data: books = [], refetch } = useQuery<bookT[]>({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/book');
            console.log(response.data)
            return response.data.books;
        }
    });
    console.log(books);
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Books</h1>
                <Link href="/dashboard/manage-books/add" className="btn btn-primary">
                    Add Book
                </Link>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Cover</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>
                                        <Image
                                            src={book.coverUrl}
                                            alt={book.title}
                                            width={60}
                                            height={60}
                                            className="rounded max-w-xs"
                                        />
                                    </td>
                                    <td className="flex gap-2">
                                        <Link
                                            href={`/admin/manage-books/edit/${book._id}`}
                                            className="btn btn-sm btn-outline"
                                        >
                                            Edit
                                        </Link>
                                        <button className="btn btn-sm btn-error">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            books.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-400">
                                        No books found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}