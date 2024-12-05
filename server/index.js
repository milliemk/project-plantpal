import express from "express";
import cors from "cors";
import router from "./routes/testRoutes.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/users", router);
app.use("/api/books", booksRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
