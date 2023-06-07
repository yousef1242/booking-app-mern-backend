const asyncHandler = require("express-async-handler");
const cloudinary = require("../middlewares/cloudinary");
const { User } = require("../models/user");

// get all users for admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// get single users
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
});

// update user information
const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    },
    { new: true }
  );
  res.status(200).json(user);
});

// update user image
const updateUserImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(500).json("no file provided");
  }
  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "auto",
  });
  const user = await User.findById(req.params.userId);
  user.userImage = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();
  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  updateUserImage,
};
