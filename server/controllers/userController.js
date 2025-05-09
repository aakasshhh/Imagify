import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import nodemailer from "nodemailer";

const otpStore = new Map(); 

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.json({ success: false, message: "Email is required" });

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.json({ success: false, message: "User already exists" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const expiresAt = Date.now() + 5 * 60 * 1000; 

        otpStore.set(email, { otp, expiresAt });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP for Signup",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const data = otpStore.get(email);

        if (!data) return res.json({ success: false, message: "OTP not found or expired" });

        if (data.expiresAt < Date.now()) {
            otpStore.delete(email);
            return res.json({ success: false, message: "OTP expired" });
        }

        if (data.otp !== otp) return res.json({ success: false, message: "Invalid OTP" });

        otpStore.delete(email); // OTP used
        res.json({ success: true, message: "OTP verified successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { name: user.name } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, user: { name: user.name } });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const userCredits = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }

        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Plan not found" });
        }

        date = Date.now();

        const transactionData = { userId, plan, amount, credits, date };
        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        };

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                res.json({ success: false, message: error });
            }

            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment Failed" });
            }

            const userData = await userModel.findById(transactionData.userId);
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            res.json({ success: true, message: "Credits Added" });

        } else {
            res.json({ success: false, message: "Payment Failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    registerUser,
    loginUser,
    userCredits,
    paymentRazorpay,
    verifyRazorpay,
    sendOTP,
    verifyOTP,
};
