import Link from "next/link";
import React from "react";

type Props = {
  book: any;
};

const HomePage = ({ book }: Props) => {
  return (
    <>
      <Link href={`${process.env.API_GATWAY_GET_ONE_BOOKS}/${book.id}`}>
        <div>{book.title}</div>
      </Link>
    </>
  );
};

export default HomePage;
