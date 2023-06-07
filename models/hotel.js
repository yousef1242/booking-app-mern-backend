const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    owner : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    city: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [
      {
        title: String,
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
      },
    ],
    country: {
      type: String,
    },
    price: {
      type: Number,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    distance: {
      type: String,
    },
    images: {
      type: [String],
    },
    rooms: {
      type: Number,
      default: 100,
    },
    maxGuests: {
      type: Number,
      default: 2,
    },
    bed: {
      type: Number,
      default: 1,
    },
    features: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true},
  }
);


hotelSchema.virtual("bookings",{
  ref : "Booking",
  foreignField : "place",
  localField : "_id"
})

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = {
  Hotel,
};
