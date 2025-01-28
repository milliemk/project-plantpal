import express from "express";
import {
  getAllListings,
  getListingById,
  postNewListing,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

// get all listings
listingsRouter.get("/", getAllListings);

// get listing by ID
listingsRouter.get("/:listingId", getListingById);

// post new listing
listingsRouter.post(
  "/uploadListing",
  jwtAuth,
  multerUpload.array("images", 2),
  postNewListing
);

export default listingsRouter;
