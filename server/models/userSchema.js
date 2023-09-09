const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// generate authentication token
userSchema.methods.generateAuthToken = async function () {
    try {
        const newtoken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        this.tokens = this.tokens.concat({ token: newtoken });
        await this.save();
        return newtoken;
    } catch (error) {
        throw error; // Throw the error so that it can be handled in the controller
    }
};

// Create the user model
const user = mongoose.model("user", userSchema);

module.exports = user;
