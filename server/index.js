import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRouter.js";
import usersRouter from "./routes/usersRouter.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passportStrategy from "./config/passport.js";
import passport from "passport";
import listingsRouter from "./routes/listingsRouter.js";
import threadsRouter from "./routes/threadsRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

function addMiddlewares() {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  passport.initialize();
  passport.use(passportStrategy);
}

async function DBConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB established");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
}

function startServer() {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
}

function loadRoutes() {
  app.use("/api/books", booksRouter);
  app.use("/api/listings", listingsRouter);
  app.use("/api/user", usersRouter);
  app.use("/api/threads", threadsRouter);
}

(async function () {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
