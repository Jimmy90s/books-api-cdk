import { Book } from "./types/book";

export const getAllBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${process.env.API_GATWAY_GET_ALL_BOOKS}`, {
    cache: "no-store",
    // next: { revalidate: 3600 },
  });
  const books = await res.json();
  console.log(books);
  return books;
};

export const addBook = async (book: Book): Promise<Book> => {
  const res = await fetch(
    "https://nq8jd7gcp3.execute-api.us-east-1.amazonaws.com/prod/books/",
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(book),
    }
  );
  const newBook = await res.json();
  return newBook;
};

export const editBook = async (book: Book) => {
  const res = await fetch(
    `https://nq8jd7gcp3.execute-api.us-east-1.amazonaws.com/prod/books/`,
    {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(book),
    }
  );
  const updatedBook = await res.json();
  return updatedBook;
};

export const deleteBook = async (book: Book): Promise<void> => {
  const res = await fetch(
    `https://nq8jd7gcp3.execute-api.us-east-1.amazonaws.com/prod/books/`,
    {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({ id: book.id }),
    }
  );
  const deletedBook = await res.json();
  return deletedBook;
};
