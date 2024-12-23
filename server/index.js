import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import courseRoute from "./routes/courseRoute.js";
import cors from "cors";
dotenv.config();
const app = express();

//! Database connection
connectDB();

//! Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//! apis
app.use("/users", userRoute);
app.use("/course", courseRoute);

//! App listening on PORT 8200 or 8000
const PORT = process.env.PORT || 8200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
