const asyncHandler = require("express-async-handler");
const { Booking } = require("../models/booking");

// add new book from user
const addBookingFromUser = asyncHandler(async (req, res) => {
  const addBooking = await Booking({
    place: req.body.placeId,
    user: req.user.id,
    checkInOfBooking: req.body.checkIn,
    checkOutOfBooking: req.body.checkOut,
    nightOfBooking: req.body.night,
    priceOfBooking: req.body.price,
    HowManygusts: req.body.gusts,
    HowManyRooms: req.body.rooms,
    ownerThisPlace: req.body.ownerThisPlace,
  });
  const saveBooking = await addBooking.save();
  res.status(200).json({ message: "You booked successfully", addBooking });
});

// get all booking for admin
const getAllBooking = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate("place").populate("user");
  res.status(200).json(bookings);
});

// find booking for user
const findBookingForUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("place")
    .sort({ createdAt: -1 });
  res.status(200).json(bookings);
});

// find booking for owner
const findBookingForOwner = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ ownerThisPlace: req.params.ownerId })
    .populate("place")
    .sort({ createdAt: -1 })
    .populate("user");
  res.status(200).json(bookings);
});

// delete booking for user
const cancelBookingForUser = asyncHandler(async (req, res) => {
  await Booking.findByIdAndUpdate(
    req.params.bookingId,
    {
      $set: {
        isCanceled: true,
      },
    },
    { new: true }
  );
  const books = await Booking.find({})
    .populate("place")
    .sort({ createdAt: -1 });
  res.status(200).json(books);
});

// delete all bookings
const deleteAllBooking = asyncHandler(async (req, res) => {
  await Booking.deleteMany();
  res.status(200).json({ message: "Booking are deleted" });
});

module.exports = {
  addBookingFromUser,
  findBookingForUser,
  getAllBooking,
  cancelBookingForUser,
  deleteAllBooking,
  findBookingForOwner,
};
