import BooksModel from "../models/booksModel.js";

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await BooksModel.find({});
    return res.status(200).json({
      books: allBooks,
    });
  } catch (error) {
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};

export { getAllBooks };
