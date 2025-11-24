import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectdb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

import session from "express-session";
import passport from "passport";
import "./config/passport.js";

// Google Auth Route
import authGoogleRoute from "./routes/authGoogleRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ---------- CORS FIX FOR DEPLOYMENT ----------
app.use(cors({
  origin: process.env.CLIENT_URL,     // Your Vercel frontend
  credentials: true
}));

// Body parser
app.use(express.json());

// ---------- SESSION + PASSPORT ----------
app.use(session({
  secret: process.env.SESSION_SECRET || "yourSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // If later using HTTPS custom domain, set true
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------- CONNECT DATABASE ----------
await connectdb();

// ---------- ROUTES ----------
app.use("/auth", authGoogleRoute);
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Root
app.get("/", (req, res) => {
  res.json({ status: "Backend OK", deployed: true });
});

// ---------- START SERVER ----------
app.listen(PORT, () =>
  console.log(`​🚀 Backend running on port ${PORT}`)
);
