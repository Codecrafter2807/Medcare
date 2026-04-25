import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import https from "https";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// Self-ping to prevent Render from sleeping
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
const URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

setInterval(() => {
  const protocol = URL.startsWith("https") ? https : http;
  protocol.get(URL, (res) => {
    console.log(`Self-ping status: ${res.statusCode}`);
  }).on("error", (err) => {
    console.error(`Self-ping error: ${err.message}`);
  });
}, PING_INTERVAL);

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is Connected");
  } catch (error) {
    console.log("MongoDB database is Failed");
    console.error(error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is Running " + port);
});
