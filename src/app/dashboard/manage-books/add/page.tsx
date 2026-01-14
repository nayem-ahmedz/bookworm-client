import AddBookForm from "@/components/dashboard/books/AddBookForm";

export default function AddBook() {
    return (
        <div className="hero min-h-[70vh]">
            <title>Add Book</title>
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center lg:text-left gap-0">
                    <h1 className="text-3xl md:text-5xl/tight font-bold">Add Book</h1>
                    <p className="py-6 max-w-md">
                        Join our BookWorm platform and search, browse and read any books, save your favorite books, create collection and many more
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <AddBookForm />
                    </div>
                </div>
            </div>
        </div>
    );
}