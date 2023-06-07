const asyncHandler = require("express-async-handler");
const { Hotel } = require("../models/hotel");
const { Booking } = require("../models/booking");
const cloudinary = require("../middlewares/cloudinary");

const addNewHotel = asyncHandler(async (req, res) => {
  const addHotel = new Hotel(req.body);
  if (!req.files || req.files.length === 0) {
    return res.status(500).json({ message: "no files provided" });
  }
  const imageUrls = [];
  for (let i = 0; i < req.files.length; i++) {
    const result = await cloudinary.uploader.upload(req.files[i].path, {
      resource_type: "auto",
    });
    imageUrls.push(result.secure_url);
  }
  addHotel.images = imageUrls;
  if (Array.isArray(req.body.feature)) {
    addHotel.features = req.body.feature;
  } else if (req.body.feature) {
    addHotel.features.push(req.body.feature);
  }
  const hotel = await addHotel.save()
  res.status(200).json({ message: "Hotel created successfully" });
});

const getSingleHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotelId).populate({
    path: "reviews",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!hotel) {
    return res.status(500).json({ message: "Hotel is not found" });
  }
  res.status(200).json(hotel);
});

// delete hotel
const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.hotelId);
  if (!hotel) {
    return res.status(400).json({ message: "Hotel is not found" });
  }
  await Booking.deleteMany({ place: hotel._id });
  res.status(200).json({ message: "Hotel deleted successfully" });
});

// update hotel
const updateHotel = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(500).json({ message: "no files provided" });
  }

  const imageUrls = [];
  for (let i = 0; i < req.files.length; i++) {
    const result = await cloudinary.uploader.upload(req.files[i].path, {
      resource_type: "auto",
    });
    imageUrls.push(result.secure_url);
  }

  const updatedFields = {
    ...req.body,
    images: imageUrls,
  };

  if (Array.isArray(req.body.feature)) {
    updatedFields.features = req.body.feature;
  } else if (req.body.feature) {
    updatedFields.features = [req.body.feature];
  }

  const hotel = await Hotel.findByIdAndUpdate(req.params.hotelId, {
    $set: updatedFields,
  });

  res.status(200).json({ message: "Hotel updated successfully",hotel : hotel });
});

// updare hotel tooms when user book
const updateHotelRooms = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotelId);

  const bookedRooms = req.body.rooms;
  if (isNaN(bookedRooms)) {
    res.status(400);
    throw new Error("Invalid 'rooms' value");
  }

  if (bookedRooms > hotel.rooms) {
    res.status(400);
    throw new Error("Cannot book more rooms than available in the hotel.");
  }

  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.hotelId,
    { $set: { rooms: hotel.rooms - bookedRooms } },
    { new: true }
  );

  res.status(200).json(updatedHotel);
});

// get all hotels
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});

// add review for hotel
const addReviewInHotel = asyncHandler(async (req, res) => {
  newReview = {
    title: req.body.title,
    owner: req.user.id,
  };
  const hotels = await Hotel.findByIdAndUpdate(
    req.params.hotelId,
    {
      $push: { reviews: newReview },
    },
    { new: true }
  ).populate({
    path: "reviews",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  res.status(200).json(hotels);
});

// delete review for hotel
const deleteReviewForHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findOneAndUpdate(
    { _id: req.params.hotelId },
    {
      $pull: { reviews: { _id: req.body.reviewId } },
    },
    { new: true }
  ).populate({
    path: "reviews",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }
  res.status(200).json(hotel);
});

// delete all reviews
const deleteAllReviews = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  const result = await Hotel.updateOne(
    { _id: hotelId },
    { $set: { reviews: [] } }
  );
  if (result.nModified === 0) {
    return res
      .status(404)
      .json({ message: "No hotel found with the given ID" });
  }
  res.status(200).json({ message: "All reviews have been deleted" });
});

// filter by search
const filterHotel = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const query = {
    $or: [
      { city: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { distance: { $regex: search, $options: "i" } },
    ],
  };
  const hotels = await Hotel.find(query);
  res.json(hotels);
});

// get hotels for owner
const getHotelsForOwner = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ owner: req.params.ownerId })
    .populate("bookings")
    .populate({
      path: "bookings",
      populate: { path: "user" },
    });
  res.json(hotels);
});

module.exports = {
  addNewHotel,
  deleteHotel,
  getAllHotels,
  updateHotel,
  addReviewInHotel,
  getSingleHotel,
  filterHotel,
  updateHotelRooms,
  deleteAllReviews,
  deleteReviewForHotel,
  getHotelsForOwner,
};
