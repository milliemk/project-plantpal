import ListingsModel from "../models/listingsModel.js";

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

export { getAllListings };
