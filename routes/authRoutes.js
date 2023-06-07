const router = require("express").Router();
const { registerCtr, loginrCtr } = require("../controllers/auth");


// register
router.post("/register", registerCtr);

// login
router.post("/login", loginrCtr);


module.exports = router;