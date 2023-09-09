const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

// User Registration
exports.userRegister = async (req, res) => {
    const { fname, email, password } = req.body;

    try {
    // Data Validation
        if (!fname || !email || !password) {
            return res.status(400).json({ error: "Please Enter All Input Data" });
        }

        // Check if the user already exists
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "This User Already Exists in our Database" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user document
        const userRegister = new users({
            fname,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const storedData = await userRegister.save();

        // Send a 201 Created response with the stored user data
        res.status(201).json(storedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// User Send OTP
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please Enter Your Email" });
    }

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ error: "This User Does Not Exist in our Db" });
        }

        // Generate OTP
        const OTP = Math.floor(100000 + Math.random() * 900000);

        // Check if OTP document exists
        const otpDoc = await userotp.findOne({ email });

        if (otpDoc) {
            // Update existing OTP
            otpDoc.otp = OTP;
            await otpDoc.save();
        } else {
            // Create new OTP document
            const saveOtpData = new userotp({
                email,
                otp: OTP,
            });
            await saveOtpData.save();
        }

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email For OTP Validation",
            text: `OTP: ${OTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(400).json({ error: "Email not sent" });
            } else {
                console.log("Email sent", info.response);
                return res.status(200).json({ message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// User Login
exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ error: "Please Enter Your OTP and email" });
    }

    try {
        // Verify OTP
        const otpVerification = await userotp.findOne({ email });

        if (!otpVerification || otpVerification.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // User authentication successful, generate JWT token
        const user = await users.findOne({ email });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ message: "User Login Successfully Done", userToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.userDetails = async (req, res) => {
    const { email } = req.body; // Assuming fname is sent in the request body

    try {
        // Find the user by fname
        const userData = await users.findOne({ email });
        console.log(userData);
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};