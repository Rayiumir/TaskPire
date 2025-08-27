const multer = require("multer");

//Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//File Filter

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }else {
        cb(new Error("Only jpg, png, and jpeg formats are allowed"));
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;