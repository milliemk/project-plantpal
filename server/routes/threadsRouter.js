import express from "express";
import {
  getThreads,
  sendMessage,
  startNewThread,
} from "../controller/threadsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const threadsRouter = express.Router();

// get all listings
threadsRouter.get("/", getThreads);

threadsRouter.post("/", jwtAuth, startNewThread);

threadsRouter.post("/:threadId/messages", jwtAuth, sendMessage);

export default threadsRouter;
