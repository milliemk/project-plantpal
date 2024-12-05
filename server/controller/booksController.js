import BooksModel from "../models/booksModel.js";

const getAllBooks = async (req, res) => {
  const allBooks = await BooksModel.find({});
  res.send(allBooks);
  console.log("Get all Books", allBooks);
};

export { getAllBooks };
