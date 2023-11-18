"use client";
import { Book } from "@/types/book";
import React, { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteBook, editBook } from "@/api";

interface SingleBookProps {
  book: Book;
}

const SingleBook: React.FC<SingleBookProps> = ({ book }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
  const [newBookTitle, setNewBookTitle] = useState<string>(book.title);
  const [newBookAuthor, setNewBookAuthor] = useState<string>(book.author);

  const handleSubmitEditBook: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const edited = async () => {
      await editBook({
        id: book.id,
        title: newBookTitle,
        author: newBookAuthor,
      });
    };
    edited().finally;
    // setNewBookAuthor("");
    // setNewBookTitle("");
    setModalOpen(false);
    router.refresh();
    router.refresh();
  };

  const handleDeleteBook = async (book: Book) => {
    await deleteBook(book);
    setModalOpenDeleted(false);
    router.refresh();
  };

  return (
    <tr key={book.id}>
      <td className="w-96">{book.title}</td>
      <td className="w-96">{book.author}</td>
      <td className="flex gap-8 text-right">
        <FiEdit
          onClick={() => setModalOpen(true)}
          cursor="pointer"
          className="text-gray-300"
          size={20}
        />
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitEditBook} id="addBook-form">
            <h3 className="font-bold text-lg">Add Book</h3>
            <div className="modal-action"></div>
            <input
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs m-3"
            />
            <input
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              type="text"
              placeholder="Author"
              className="input input-bordered w-full max-w-xs m-3"
            />
            <button className="btn btn-circle w-full " type="submit">
              Submit
            </button>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setModalOpenDeleted(true)}
          cursor="pointer"
          className="text-red-700"
          size={20}
        />
        <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
          <h3 className="text-lg">
            {" "}
            Are you sure you want to delete this book?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteBook(book)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default SingleBook;
