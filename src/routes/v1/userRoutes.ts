import express from "express";
const router = express.Router();
import UserControllers from "../../controllers/userController";
import { googleAuth } from "../../controllers/googleAuth";
import catchAsync from "../../utils/catchAsync";

import checkSpecialCharacters from "../../middlewares/user/checkSpecialCharacters";
import {
  validateUserAuthforSignIn,
  validateUserAuthforSignUp,
  userExist,
} from "../../middlewares/validateRequests";
import isOwner from "../../middlewares/user/isOwner";
import multer from "multer";
import userController from "../../controllers/userController";
import { storage } from "../../cloudinary";
const upload = multer({
  storage,
});
// This api is called by the user himself after login to set the user on client
router.get("/get-user/:id", UserControllers.getByUserId);
// Never use underscores
router.get("/get_user/:username", UserControllers.getByUsername);

//route for checking the availblity of a username
router.get(
  "/check-username",
  checkSpecialCharacters,
  UserControllers.checkUsername
);

router.post(
  "/signup",
  validateUserAuthforSignUp,
  userExist,
  UserControllers.create
);
router.post("/signin", validateUserAuthforSignIn, UserControllers.signIn);

//toggle account privacy
router.post("/toggleAccount/:id", UserControllers.togglePrivacy);

// For email verification
router.get("/verify-email", UserControllers.verifyEmailtoken);

// We can use a middleware instead of a route
router.get("/isauthenticated", UserControllers.isAuthenticated);

// Google auth route for both signup and signin
router.get("/google-auth", catchAsync(googleAuth));

// only admin
router.patch("/setPremium", UserControllers.setPremium);

// delete user route
router.delete(
  "/delete/:id",
  userController.deleteUser
);

router.patch("/userInfo", upload.single("profilePic"), userController.userInfo)

//giving error on local @TODO
// Update profile-pic Route
//router.update("/profile-pic",  upload.single("image"), UserControllers.updateProfilePic)

export default router;
