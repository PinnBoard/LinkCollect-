const express = require("express");
const router = express.Router();
const collectionController = require("../../controllers/collectionController");
const { isPublicCheck, userExist, checkWhenSomeoneisFetchigCollection } = require('../../middlewares/validateRequests');
const {collectionLimit} = require('../../middlewares/limits');
const { storage } = require("../../cloudinary");
const isUserPublic = require("../../middlewares/isUserPublic");
const { isCollectionOwner } = require("../../middlewares/isCollectionOwner");
const multer = require("multer");
const upload = multer({
  storage,
});

// Postioning of routes matter, let the specific routes come before general routes

// -------------------------------SPECIAL ROUTES------------------------//

router.get("/without-timelines", collectionController.getAll);

// Special Route to get all collections that are public by username by ANYONE
router.get("/user/:username", isUserPublic, collectionController.getAllByUsername)

// Check for duplicate link
router.post("/:id/check-duplicate-link", collectionController.doesLinkExist)

// ---------------------------------------------------------------------- //

// CRUD ROUTES
router.get("/:id",isCollectionOwner ,collectionController.get);
router.get("/", collectionController.getAllWithTimeline);

//collection limit removing for testing
router.post("/",collectionLimit ,upload.single("image"), collectionController.create);
router.patch("/:id", isCollectionOwner, upload.single("image"), collectionController.update);
router.delete("/:id", isCollectionOwner, collectionController.deleteCollection);


// UPVOTE ROUTES
router.post("/:id/upvote", collectionController.upvote);
router.post('/:id/downvote', collectionController.downvote);

// PRIVACY ROUTES
router.post('/togglePrivacy/:id', collectionController.togglePrivacy);

module.exports = router;
