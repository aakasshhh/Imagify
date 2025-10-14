import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectdb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // import passport config

// Auth route
import authGoogleRoute from "./routes/authGoogleRoute.js";
// const authGoogleRoute = require('./routes/authGoogleRoute');

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
await connectdb();

// Routes
app.use("/auth", authGoogleRoute);
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Root Route
app.get('/', (req, res) => res.send("API Working"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});