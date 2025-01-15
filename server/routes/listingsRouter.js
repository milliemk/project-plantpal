import express from "express";
import {
  getAllListings,
  postNewListing,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

listingsRouter.get("/", getAllListings);

listingsRouter.post(
  "/uploadListing",
  jwtAuth,
  multerUpload.single("images"),
  postNewListing
);

export default listingsRouter;
