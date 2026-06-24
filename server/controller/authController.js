const citizenModel = require("../model/citizenModel")
const otpModel = require("../model/otpModel")
const generateOtp = require("../utils/generateOtp")
const generateToken = require("../utils/generateToken")
const sendEmail = require("../utils/sendEmail")


const sendOpt = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            })
        }

        const normalizedEmail = email.toLowerCase().trim()

        const otp = generateOtp()

        await otpModel.deleteMany({ email: normalizedEmail })
        await otpModel.create({
            email: normalizedEmail,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        })

        await sendEmail({
            to: normalizedEmail,
            subject: "Your Smart Civic Connect OTP",
            html: `
                <div style="font-family: Arial, sans-serif;">
                <h2>Smart Civic Connect</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
                </div>
            `,
        })

        return res.status(200).json({
            message: "OTP sent successfully",
            otp,
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to send OTP",
            error: err.message,
        })

    }
}


const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            })
        }

        const normalizedEmail = email.toLowerCase().trim()

        const otpRecord = await otpModel.findOne({
            email: normalizedEmail,
            otp,
        })
        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid OTP",
            })
        }
        if (otpRecord.expiresAt < Date.now()) {
            await otpModel.deleteMany({ email: normalizedEmail })
            return res.status(400).json({
                message: "OTP expired",
            })
        }

        let citizen = await citizenModel.findOne({
            email: normalizedEmail,
        })
        if (!citizen) {
            citizen = await citizenModel.create({
                email: normalizedEmail,
            })
        }

        const token = generateToken({
            id: citizen._id,
            email: citizen.email,
            role: citizen.role,
        })

        await otpModel.deleteMany({ email: normalizedEmail })

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: citizen._id,
                email: citizen.email,
                role: citizen.role,
                fullName: citizen.fullName,
                phone: citizen.phone,
                profilePhoto: citizen.profilePhoto,
            }
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Failed to verify OTP",
            error: err.message,
        })
    }
}

module.exports = {
    sendOpt,
    verifyOtp,
}