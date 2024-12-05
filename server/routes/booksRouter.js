import express from "express";
import { getAllBooks } from "../controller/booksController.js";

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);

export default booksRouter;
