const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');


const userShcema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    isHotelOwner : {
        type : Boolean,
        default : false,
    },
    userImage : {
        type : Object,
        default : {
            url : "https://th.bing.com/th/id/R.528f350a827577bf8cf77a379a118d43?rik=lsh48ceoaQk0vw&pid=ImgRaw&r=0",
            publicId : null,
        }
    },
});

userShcema.methods.generateUserToken = function() {
    return jwt.sign({id : this._id, isAdmin : this.isAdmin}, process.env.JWT_SECRET)
}


const User = mongoose.model("User", userShcema);


module.exports = {
    User,
}