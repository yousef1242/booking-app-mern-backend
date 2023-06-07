const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { addBookingFromUser, getAllBooking, findBookingForUser, cancelBookingForUser, deleteAllBooking, findBookingForOwner } = require("../controllers/bookingController");


// add booking routes
router.post("/add-book", verifyToken,addBookingFromUser);

// get all booking for admin
router.get("/", getAllBooking);

// get all booking for user
router.get("/booking-for-user", verifyToken,findBookingForUser);

// get all booking for owner
router.get("/booking-for-owner/:ownerId",findBookingForOwner);

// cancel booking from user
router.put("/cancel-booking/:bookingId", cancelBookingForUser);

// delete all booking
router.delete("/delete-all-booking", deleteAllBooking);


module.exports = router;