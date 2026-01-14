'use client';
import Image from "next/image";
import Link from "next/link";
import { bookT } from "@/types/book";
import { axiosInstance } from "@/lib/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ManageBooksPage() {
    const { data: books = [], refetch } = useQuery<bookT[]>({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await axiosInstance.get('/api/book');
            // console.log(response.data)
            return response.data.books;
        }
    });
    const handleDelete = async (id: string): Promise<void> => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the book!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosInstance.delete(`/api/book/${id}`);
                if (res.data.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The book has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while deleting the book.",
                    icon: "error"
                });
            }
        }
    };
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
                                            href={`/dashboard/manage-books/edit/${book._id}`}
                                            className="btn btn-sm btn-outline"
                                        >
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error">
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