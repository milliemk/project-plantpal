import express from "express";
import {
  getAllListings,
  getListingsByDeal,
  postNewListing,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

listingsRouter.get("/", getAllListings);

listingsRouter.post(
  "/uploadListing",
  jwtAuth,
  multerUpload.array("images", 2),
  postNewListing
);

listingsRouter.get("/:deal", getListingsByDeal);

export default listingsRouter;
