const mongoose = require("mongoose")

const citizenSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName: {
            type: String,
            trim: true,
            default: "",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        profilePhoto: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        city: {
            type: String,
            trim: true,
            default: "",
        },

        ward: {
            type: String,
            trim: true,
            default: "",
        },

        pincode: {
            type: String,
            trim: true,
            default: "",
        },

        role: {
            type: String,
            enum: ["citizen"],
            default: "citizen",
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Citizen", citizenSchema)