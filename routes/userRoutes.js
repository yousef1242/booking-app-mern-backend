const { getAllUsers, getSingleUser, updateUserInfo, updateUserImage } = require("../controllers/userController");
const storage = require("../middlewares/multer");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");


// get all users for admin
router.get("/", getAllUsers);

// get single user
router.get("/:userId", getSingleUser);

// update profile info
router.post("/update-profile-info/:userId", verifyToken,updateUserInfo);

// update profile image
router.post("/update-profile-image/:userId", verifyToken,storage.single("file"),updateUserImage);



module.exports = router;