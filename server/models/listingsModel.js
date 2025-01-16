import mongoose from "mongoose";

// create schema

const listingsSchema = new mongoose.Schema(
  {
    deal: {
      type: String,
      require: true,
    },
    condition: {
      type: String,
      require: true,
    },
    delivery: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    images: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    location: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: false,
    },
    soil: {
      type: String,
      require: true,
    },
    light: {
      type: String,
      require: true,
    },
    species: {
      type: String,
      require: true,
    },
    water: {
      type: String,
      require: true,
    },
    swapfor: {
      type: String,
      require: false,
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// transform schema into a model
const ListingsModel = mongoose.model("Listing", listingsSchema);

export default ListingsModel;
