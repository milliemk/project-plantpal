import { useEffect, useState } from "react";
import { Book } from "../types/customTypes";

function Books() {
  const [books, setBooks] = useState<Book[] | null>(null);

  const getBooks = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/books`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
        setBooks(result);
      }
    } catch (err) {
      const error = err as Error;
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div className="book-container">
        {books &&
          books.map((book) => {
            return (
              <div className="book-box">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <p>{book.genre}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Books;
