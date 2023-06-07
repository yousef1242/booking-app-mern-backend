const {
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
} = require("../controllers/hotelController");
const router = require("express").Router();
const storage = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");

// add hotel
router.post("/add-hotel", storage.array("files"), addNewHotel);

// get all hotels
router.get("/", getAllHotels);

// get single hotels
router.get("/:hotelId", getSingleHotel);

// delete hotel
router.delete("/delete-hotel/:hotelId", deleteHotel);

// update hotel
router.put("/update-hotel/:hotelId", storage.array("files"), updateHotel);

// update hotel rooms when user book
router.put("/update-hotel/rooms/:hotelId", updateHotelRooms);

// update hotel with review
router.put("/add-review-hotel/:hotelId", verifyToken, addReviewInHotel);

// search hotel
router.post("/search", filterHotel);

// delete all reviews
router.delete("/:hotelId/delete/reviews", deleteAllReviews);

// delete one reviews
router.delete("/:hotelId/delete/review", deleteReviewForHotel);

// get all hotels for owner
router.get("/owner/:ownerId", getHotelsForOwner);

module.exports = router;
