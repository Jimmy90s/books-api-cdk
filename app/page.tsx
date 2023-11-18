import AddBook from "@/components/AddBook";
import BookList from "@/components/BookList";
import { getAllBooks } from "@/api";

// const res = await fetch(`${process.env.API_GATWAY_GET_ALL_BOOKS}`, {
//   cache: "default",
// });
// const books = await res.json();
// console.log(books);

// {books &&
//   books.map((book: Book) => (
//     <div key={book.id}>
//       <HomePage book={book} />
//     </div>
//   ))}
export default async function Home() {
  const books = await getAllBooks();
  // console.log(books);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl font-bold"> Books List</h1>
        <AddBook />
        <BookList books={books} />
      </div>
    </main>
  );
}
