const multer = require('multer');

// set Storage and file name 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/userImage');
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null, filename);
    }
});

// Mentioned Extension here
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error("Only png, jpg,jpeg formatted Allow"))
    }
}

// Upload the image
const userUpload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = userUpload;