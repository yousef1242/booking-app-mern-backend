const mongoose = require("mongoose")

exports.ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB)
        console.log("success to connect DB");
    } catch (error) {
        console.log("faild connect", error);
    }
}