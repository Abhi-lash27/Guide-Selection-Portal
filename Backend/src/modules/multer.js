import multer from "multer"

const imgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        //where to store the file
        cb(null, "src/uploads/img");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});


export const imgUpload = multer({
    storage: imgStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});

