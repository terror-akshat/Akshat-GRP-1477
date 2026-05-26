const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./Databse/Mongo.js");
const ApiRoute = require("./Routes/route.js");
const wardRoute = require("./Routes/ward.js");
const ipdRoute = require("./Routes/ipdRoute.js");
const { verifyToken } = require("./verifyAuth.js");
const Upload = require("./Routes/upload.js");
const billRoute = require("./Routes/billingRoute.js");
const path = require("path");
// const { cloudinary } = require("./cloudnary/cloudnary.js");
const app = express();
require("dotenv").config();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
  "http://localhost:3000",
  "http://localhost:5173",
]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth/", ApiRoute);
app.use("/api/ward/", verifyToken, wardRoute);
app.use("/api/ipd/", ipdRoute);
app.use("/api/uploads", Upload);
app.use("/api/bill", billRoute);

connect();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
