import express from "express";
import { getAllListings } from "../controller/listingsController.js";

const listingsRouter = express.Router();

listingsRouter.get("/", getAllListings);

export default listingsRouter;
