const express = require("express")
const router = express.Router()
const { sendOpt, verifyOtp } = require("../controller/authController")


router.post("/send-otp", sendOpt)
router.post("/verify-otp", verifyOtp)

module.exports = router
