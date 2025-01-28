import "./dotenvSetup.js"; // Ensures process.env is populated firstß
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passportStrategy from "./config/passport.js";
import passport from "passport";
import listingsRouter from "./routes/listingsRouter.js";
import threadsRouter from "./routes/threadsRouter.js";

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
  app.listen(port, "0.0.0.0", () => {
    console.log("Server is running on " + port + "port");
  });
}

function loadRoutes() {
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
