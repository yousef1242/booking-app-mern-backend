const mongoose = require("mongoose");

const bookingShcema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Hotel"
    },
    ownerThisPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    checkInOfBooking: {
      type: Date,
    },
    checkOutOfBooking: {
      type: Date,
    },
    nightOfBooking: {
      type: Number,
      default: 1,
    },
    priceOfBooking: {
      type: Number,
    },
    HowManygusts: {
      type: Number,
      default: 2,
    },
    HowManyRooms: {
      type: Number,
      default: 1,
    },
    isCanceled : {
      type : Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingShcema);

module.exports = {
  Booking,
};
