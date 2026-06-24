const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConnect
