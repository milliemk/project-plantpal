import ListingsModel from "../models/listingsModel.js";
import UserModel from "../models/usersModel.js";
import { pictureUpload } from "../utils/pictureUpload.js";

const getAllListings = async (req, res) => {
  try {
    const allListings = await ListingsModel.find({});
    return res.status(200).json({
      listings: allListings,
    });
  } catch (error) {
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};

const postNewListing = async (request, response) => {
  try {
    const userId = request.user._id;

    // upload picture in cloudinary
    const uploadedImage = await pictureUpload(request.file.path);

    if (!uploadedImage) {
      console.log("upload failed");
      return res.status(500).json({
        error: "File couldn't be uploaded",
      });
    }
    //creating variable to save the data in
    const listingData = {
      condition: request.body.condition,
      images: [
        {
          secure_url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        },
      ],
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
      const user = await UserModel.findById(userId);
      user.postedListings.push(listing._id);
      await user.save();
      console.log("USER :>> ", user);
    } catch (error) {
      console.log("Error saving reference to the user", error);
      return response.status(500).json({
        error: "Error updating user data",
      });
    }
    return response.status(201).json({
      message: "Listing successfully created!",
      listing: listing, // You can send the created listing back if needed
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getAllListings, postNewListing };
