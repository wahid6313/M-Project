import express, { Router } from "express";
import {
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUser,
  login,
  logOut,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").get(logOut);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePhoto"), editProfile);
router.route("/suggested").get(isAuthenticated, getSuggestedUser);
router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);

export default router;
