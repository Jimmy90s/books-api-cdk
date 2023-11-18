import { Book } from "@/types/book";
import React from "react";
import SingleBook from "./SingleBook";

interface BookListProps {
  books: Book[];
}
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
const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="overflow-x-auto w-full justify-content-center">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book: Book) => <SingleBook book={book} key={book.id} />)}
          {/* row 1 */}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
