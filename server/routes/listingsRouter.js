import express from "express";
import {
  getAllListings,
  getListingsByDeal,
  postNewListing,
  searchListings,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

// get all listings
listingsRouter.get("/", getAllListings);

// post new listing
listingsRouter.post(
  "/uploadListing",
  jwtAuth,
  multerUpload.array("images", 2),
  postNewListing
);

// get listings by search
listingsRouter.get("/search", searchListings);

// get listings by deal
listingsRouter.get("/:deal", getListingsByDeal);

export default listingsRouter;
