const multer = require('multer')
const cloudinary = require("../config/cloudinary")


const { cloudinaryStorage } = require('multer-storage-cloudinary')


const storage = cloudinaryStorage({
    cloudinary,
    params: {
        folder: 'civic_grievance',
        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
        ],
    },
})

const upload = multer({ storage })

module.exports = upload


