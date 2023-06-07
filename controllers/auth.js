const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");



const registerCtr = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (user) {
            return res.status(500).json({message : "User already exists"});
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const addUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword,
            isHotelOwner : req.body.isHotelOwner,
        });
        await addUser.save();
        res.status(200).json({message : "You registered successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
});


const loginrCtr = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (!user) {
            return res.status(500).json({message : "User not found"});
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).json({message : "Password doesn't match"});
        }
        const token = user.generateUserToken()
        res.status(200).json({
            id : user._id,
            username : user.username,
            userImage : user.userImage,
            isAdmin : user.isAdmin,
            isHotelOwner : user.isHotelOwner,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
});



module.exports = {
    registerCtr,
    loginrCtr,
}
