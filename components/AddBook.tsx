"use client";

import { AiOutlinePlusCircle } from "react-icons/ai";
import React, { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addBook } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type Props = {};

const AddBook = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newBookTitle, setNewBookTitle] = useState<string>("");
  const [newBookAuthor, setNewBookAuthor] = useState<string>("");

  const handleSubmitNewBook: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newBook = async () => {
      await addBook({
        // id: uuidv4(),
        title: newBookTitle,
        author: newBookAuthor,
      });
    };
    newBook().catch();
    setNewBookAuthor("");
    setNewBookTitle("");
    setModalOpen(false);
    router.refresh();
    router.refresh();
  };

  return (
    <div className="m-2 w-full">
      <button
        className="btn btn-circle w-full "
        onClick={() => setModalOpen(true)}
      >
        Add new book <AiOutlinePlusCircle size={20} className="m-2" />
      </button>

      <div>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewBook} id="addBook-form">
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
      </div>
    </div>
  );
};

export default AddBook;
