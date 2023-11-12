import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";

type Book = {
  id: string;
  title: string;
  author: string;
};

export default async function Home() {
  const res = await fetch(
    "https://nq8jd7gcp3.execute-api.us-east-1.amazonaws.com/prod/books"
  );
  const books = await res.json();
  console.log(books);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {books &&
          books.map((book: Book, i: Key | null | undefined) => (
            <div key={i}>
              <li>{book.title}</li>
              <li>{book.author}</li>
            </div>
          ))}
      </div>
    </main>
  );
}
