import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      secureUrl: { type: String, required: false },
      publicId: { type: String, required: false },
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: false,
      },
    ],
    postedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
