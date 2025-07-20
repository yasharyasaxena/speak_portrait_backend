const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

upload.fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp3|wav|mp4/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('File type not allowed'));
    }
};

module.exports = upload;
