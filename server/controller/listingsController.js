import ListingsModel from "../models/listingsModel.js";
import UserModel from "../models/usersModel.js";
import { pictureUpload } from "../utils/pictureUpload.js";

const getAllListings = async (req, res) => {
  try {
    // get all listing and populate needed fields for seller
    const allListings = await ListingsModel.find({}).populate(
      "seller",
      "username avatar postedListings -_id"
    );
    return res.status(200).json({
      listings: allListings,
    });
  } catch (error) {
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};

const getListingsByDeal = async (request, response) => {
  const { deal } = request.params;

  // find all the listings under the chosen deal
  try {
    if (deal) {
      const selectedDeal = await ListingsModel.find({ deal: deal }).populate(
        "seller",
        "username avatar postedListings -_id"
      );
      // if length is 0 it means no listings under that deal
      if (selectedDeal.length === 0) {
        return response.status(404).json({
          message: `No listings found for the specified deal: ${deal}`,
        });
      }
      // if everything goes well and listings are found
      return response.status(200).json({
        message: `Listings successfully retrieved for deal: ${deal}`,
        selectedDeal,
      });
    } else {
      return response.status(400).json({
        message: "Deal parameter is required.",
      });
    }

    // if something goes wrong
  } catch (error) {
    console.log("error :>> ", error);
    return response.status(400).json({
      error: "Something went wrong, please try again",
    });
  }
};

// search for listings

const searchListings = async (request, response) => {
  const { search } = request.query;

  try {
    // where we will store the conditions for the search query
    const searchCriteria = {};

    // regex
    if (search) {
      // $or = at least one of these conditions must be true in order for a document to match
      // $regex: specifies a regular expression for pattern matching (words, combination of letters etc).
      searchCriteria.$or = [
        { condition: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { species: { $regex: search, $options: "i" } },
        { swapfor: { $regex: search, $options: "i" } },
      ];
    }

    // find all listings with this search criteria/pattern
    const listings = await ListingsModel.find(searchCriteria).populate(
      "seller",
      "username avatar postedListings -_id"
    );

    if (listings.length === 0) {
      return response.status(404).json({
        message: "No listings found.",
      });
    }

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
    const userId = request.user.id;

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
      "username avatar postedListings -_id"
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

export { getAllListings, postNewListing, getListingsByDeal, searchListings };
