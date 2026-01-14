'use client';
import { axiosInstance } from "@/lib/axiosPublic";
import { imageUploadBB } from "@/lib/imageUploadBB";
import { bookT } from "@/types/book";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Genre {
    _id: string;
    name: string;
    description?: string;
}

export default function EditBook() {
    const { id } = useParams(); // Book ID from URL
    const router = useRouter();
    const [bookData, setBookData] = useState<bookT | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch book by ID
    useEffect(() => {
        if (!id) return;

        const fetchBook = async () => {
            try {
                const res = await axiosInstance.get(`/api/book/${id}`);
                setBookData(res.data.book);
            } catch (err) {
                toast.error("Failed to load book data");
            }
        };

        fetchBook();
    }, [id]);

    // Fetch genres
    useEffect(() => {
        axiosInstance.get("/api/genre")
            .then(res => setGenres(res.data.genres))
            .catch(() => toast.error("Failed to load genres"));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!bookData) return;

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("coverImage") as File;

        if (!title || !author || !genre) {
            toast.error("Please fill all required fields");
            setLoading(false);
            return;
        }

        try {
            // Upload new image if provided
            let coverUrl = bookData.coverUrl;
            if (imageFile && imageFile.size > 0) {
                coverUrl = await imageUploadBB(imageFile);
            }

            // PATCH request to update book
            await axiosInstance.patch(`/api/book/${id}`, { title, author, genre, description, coverUrl });

            toast.success("Book updated successfully");
            router.push("/dashboard/manage-books");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data.message || "Failed to update book");
        } finally {
            setLoading(false);
        }
    };

    if (!bookData) return <p>Loading book data...</p>;
    return (
        <div className="hero min-h-[70vh]">
            <title>Edit Book</title>
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center lg:text-left gap-0">
                    <h1 className="text-3xl md:text-5xl/tight font-bold">Edit Book</h1>
                    <p className="py-6 max-w-md">
                        Join our BookWorm platform and search, browse and read any books, save your favorite books, create collection and many more
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset max-w-md">
                                <label className="label">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Book Title"
                                    defaultValue={bookData.title}
                                    required
                                />

                                <label className="label">Author</label>
                                <input
                                    name="author"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Author Name"
                                    defaultValue={bookData.author}
                                    required
                                />

                                <label className="label">Genre</label>
                                <select
                                    name="genre"
                                    className="select select-bordered w-full"
                                    required
                                    defaultValue={bookData?.genre} // Use optional chaining
                                >
                                    {genres.map(g => (
                                        <option key={g._id} value={g._id}>{g.name}</option>
                                    ))}
                                </select>

                                <label className="label">Cover Image</label>
                                <input
                                    name="coverImage"
                                    type="file"
                                    className="file-input w-full"
                                    accept="image/*"
                                />
                                <p className="text-sm text-gray-500 mt-1 mb-3">
                                    Current image: <br />
                                    <img src={bookData.coverUrl} alt={bookData.title} width={100} className="rounded" />
                                </p>

                                <label className="label">Description</label>
                                <input
                                    name="description"
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Short description (optional)"
                                    defaultValue={bookData.description || ""}
                                />

                                <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                                    {loading ? "Updating Book..." : "Update Book"}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}