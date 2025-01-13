import UserModel from "../models/usersModel.js";
import {
  encryptPassword,
  isPasswordCorrect,
} from "../utils/passwordServices.js";
import { pictureDelete } from "../utils/pictureDelete.js";
import { pictureUpload } from "../utils/pictureUpload.js";
import { generateToken } from "../utils/tokenServices.js";

const avatarUpload = async (req, res) => {
  console.log(req.file);
  const userId = req.user._id;
  console.log("userId :>> ", userId);

  if (!req.file) {
    return res.status(500).json({
      error: "file extension not supported",
    });
  }
  try {
    const user = req.user;
    console.log("user :>> ", user);
    const publicIdAvatar = user.avatar.publicId;
    console.log("publicIdAvatar :>> ", publicIdAvatar);

    if (publicIdAvatar) {
      await pictureDelete(publicIdAvatar);
    }

    const uploadedImage = await pictureUpload(req.file.path);
    if (!uploadedImage) {
      console.log("upload failed");
      return res.status(500).json({
        error: "file couldn't be uploaded",
      });
    }

    console.log("uploadedImage :>> ", uploadedImage);
    if (uploadedImage) {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        avatar: {
          secureUrl: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      });

      console.log("updatedUser :>> ", updatedUser);

      return res.status(200).json({
        message: "Avatar successfully uploaded",
        avatar: {
          secureUrl: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      });
    }
  } catch (error) {
    console.log("upload failed");
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};

// REGISTER
const register = async (req, res) => {
  console.log("req.body", req.body);
  const { avatar, username, email, password } = req.body;

  // Check if email already exists
  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      message: "Sorry, this email is already in use.",
    });
  }

  // Check if username already exists
  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({
      message: "Sorry, this username is already taken.",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await encryptPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({
        error: "Sorry, something went wrong. Please try again later.",
      });
    }

    const defaultAvatar = {
      secureUrl:
        "https://res.cloudinary.com/dlnlrqxed/image/upload/v1736770729/plant-app/b3nhz8em379pzqthtgwi.jpg",
      publicId: "default",
    };
    const userAvatar = avatar || defaultAvatar;

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      avatar: userAvatar,
    });

    const storedUser = await newUser.save();

    // Return success response
    return res.status(201).json({
      message: "Registration successful",
      user: storedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Registration failed. Please try again later.",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  console.log("req.body :>> ", req.body);

  const { email, password } = req.body;
  // input validation!!

  // check if email exists
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (existingUser) {
      // check if password is correct
      const isPasswordOk = await isPasswordCorrect(
        password,
        existingUser.password
      );
      console.log("isPasswordOk :>> ", isPasswordOk);

      if (!isPasswordOk) {
        return res.status(400).json({
          message: "Password is incorrect",
        });
      }

      if (isPasswordOk) {
        // generate token
        const token = generateToken(existingUser._id);

        if (!token) {
          return res.status(500).json({
            error: "generating token failed",
          });
        }

        if (token) {
          return res.status(200).json({
            message: "user successfully logged in",
            user: {
              username: existingUser.username,
              email: existingUser.email,
              avatar: existingUser.avatar || defaultAvatar,
            },
            token,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "something went wrong during login",
    });
  }
};

const getProfile = async (req, res) => {
  console.log("req :>> ", req.user);

  return res.status(200).json({
    userProfile: {
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
};

export { avatarUpload, register, login, getProfile };
