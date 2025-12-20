import express from "express";
import cors from "cors";
import "dotenv/config";

import connectdb from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

import session from "express-session";
import passport from "passport";
import "./config/passport.js";

// Google Auth Route
import authGoogleRoute from "./routes/authGoogleRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS CONFIG 
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// BODY PARSER
app.use(express.json());

// SESSION + PASSPORT*/
app.use(
  session({
    name: "imagify.sid",
    secret: process.env.SESSION_SECRET || "imagifySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true only if using HTTPS + custom domain
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// DATABASE
await connectdb();

// ROUTES
app.use("/auth", authGoogleRoute);
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    status: "Backend OK",
    cors: "Enabled",
    environment: process.env.NODE_ENV || "development",
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Allowed origin: ${process.env.CLIENT_URL}`);
});
