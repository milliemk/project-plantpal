import ListingsModel from "../models/listingsModel.js";
import UserModel from "../models/usersModel.js";
import { pictureUpload } from "../utils/pictureUpload.js";

// get listing by ID
const getListingById = async (req, res) => {
  const { listingId } = req.params;

  if (!listingId) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // find the listing by ID
  const listing = await ListingsModel.findById(listingId).populate(
    "seller",
    "username avatar postedListings createdAt"
  );

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  return res.status(200).json({
    message: "Listing successfully retrieved.",
    listing,
  });
};

// get all listings with filter

const getAllListings = async (request, response) => {
  const { keyword } = request.query;
  const { deal } = request.query;
  const { sellerId } = request.query;
  const { listingId } = request.query;

  try {
    // where we will store the conditions for the search query
    const searchCriteria = {
      $or: [],
    };

    // regex
    if (keyword) {
      // $or = at least one of these conditions must be true in order for a document to match
      // $regex: specifies a regular expression for pattern matching (words, combination of letters etc).
      searchCriteria.$or = [
        { condition: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { species: { $regex: keyword, $options: "i" } },
        { swapfor: { $regex: keyword, $options: "i" } },
      ];
    }

    if (deal) {
      searchCriteria.deal = deal;
    }

    if (sellerId) {
      searchCriteria.seller = sellerId;
    }

    if (listingId) {
      searchCriteria._id = listingId;
    }

    // find all listings with this search criteria/pattern
    const listings = await ListingsModel.find(searchCriteria)
      .sort({ createdAt: -1 })
      .populate("seller", "username avatar postedListings createdAt");

    return response.status(200).json({
      message: "Listings successfully retrieved.",
      listings,
    });
  } catch (error) {
    console.error("Error retrieving listings:", error);
    return response.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

// post new listing
const postNewListing = async (request, response) => {
  try {
    console.log("Request User:", request.user);
    const userId = request.user._id;

    // upload picture in cloudinary

    const uploadedImages = await Promise.all(
      request.files.map(async (file) => {
        return pictureUpload(file.path);
      })
    );

    //creating variable to save the data in
    const listingData = {
      condition: request.body.condition,
      images: uploadedImages,
      delivery: request.body.delivery,
      description: request.body.description,
      light: request.body.light,
      location: request.body.location,
      price: parseInt(request.body.price),
      soil: request.body.soil,
      species: request.body.species,
      water: request.body.water,
      seller: userId,
      deal: request.body.deal,
      swapfor: request.body.swapfor,
    };

    let listing;
    try {
      listing = await ListingsModel.create(listingData);
      console.log("listing :>> ", listing);
    } catch (error) {
      console.log("error posting new listing :>> ", error);
      return response.status(500).json({
        error: "Error creating the listing",
      });
    }

    // After listing is created, update user data
    try {
      const user = await UserModel.findById(request.user.id);
      user.postedListings.push(listing._id);
      await user.save();
      console.log("USER :>> ", user);
    } catch (error) {
      console.log("Error saving reference to the user", error);
      return response.status(500).json({
        error: "Error updating user data",
      });
    }

    // Use populate here to include full seller info in the listing response
    const populatedListing = await ListingsModel.findById(listing._id).populate(
      "seller",
      "username avatar postedListings _id createdAt"
    );

    return response.status(201).json({
      message: "Listing successfully created!",
      listing: populatedListing,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getAllListings, postNewListing, getListingById };
