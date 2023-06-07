const express = require("express")
const doenv = require("dotenv")
const { ConnectDB }  = require("./config/db")
const cors = require("cors")


const app = express()


app.use(express.json())

//Cors Policy
app.use(
  cors({
    origin:"https://booking-app-mern-frontend.vercel.app"
  })
  );
  
  doenv.config()
  
  // connect DB
  ConnectDB()

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));



app.listen(process.env.PORT,() => {
    console.log("server is running");
})
