import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      secureUrl: { type: String, required: false },
      publicId: { type: String, required: false },
    },
    postedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  },
  {
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
