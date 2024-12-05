import mongoose from "mongoose";

// create schema
const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
});

// transform schema into a model
const BooksModel = mongoose.model("Book", booksSchema);

export default BooksModel;
