import express from "express";
import {
  avatarUpload,
  getProfile,
  login,
  register,
} from "../controller/userscontroller.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const usersRouter = express.Router();

usersRouter.post(
  "/avatarUpload",
  jwtAuth,
  multerUpload.single("avatar"),
  avatarUpload
);
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", jwtAuth, getProfile);

export default usersRouter;
