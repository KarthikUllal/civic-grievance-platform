const express = require("express")
require("dotenv").config()
const dbConnect = require("./config/db")
const app = require("./app")

dbConnect()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
