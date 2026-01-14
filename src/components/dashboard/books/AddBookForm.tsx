"use client";

import { axiosInstance } from "@/lib/axiosPublic";
import { imageUploadBB } from "@/lib/imageUploadBB";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Genre {
    _id: string;
    name: string;
    description?: string;
}

export default function AddBookForm() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosInstance.get("/api/genre")
            .then(res => {
                console.log(res.data);
                setGenres(res.data.genres);
            })
            .catch(() => toast.error("Failed to load genres"));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("coverImage") as File;

        if (!title || !author || !genre || !imageFile?.name) {
            toast.error("Please fill all required fields");
            setLoading(false);
            return;
        }

        try {
            const coverUrl = await imageUploadBB(imageFile);
            const res = await axiosInstance.post("/api/book", { title, author, genre, description, coverUrl });
            console.log(res.data);

            if (res.data.success) {
                toast.success(res.data.message || 'Book added successfully');
                (e.target as HTMLFormElement).reset();
            }
        } catch (err: any) {
            console.log(err)
            toast.error(err?.response?.data.message || "Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="fieldset max-w-md">
                <label className="label">Title</label>
                <input name="title" type="text" className="input input-bordered w-full" placeholder="Book Title" required />

                <label className="label">Author</label>
                <input name="author" type="text" className="input input-bordered w-full" placeholder="Author Name" required />

                <label className="label">Genre</label>
                <select name="genre" className="select select-bordered w-full" required>
                    {genres.length === 0
                        ? <option value="" disabled>No genres available</option>
                        : <>
                            <option value="" disabled selected>Select a genre</option>
                            {genres.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                        </>
                    }
                </select>

                <label className="label">Cover Image</label>
                <input name="coverImage" type="file" className="file-input w-full" accept="image/*" required />

                <label className="label">Description</label>
                <textarea
                    name="description"
                    className="textarea textarea-bordered w-full"
                    placeholder="Short description (optional)"
                ></textarea>

                <button type="submit" className="btn btn-primary mt-4" disabled={loading}>{loading ? "Adding Book..." : "Add Book"}</button>
            </fieldset>
        </form>
    );
}