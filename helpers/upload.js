const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

const upload = multer(multerConfig);

module.exports = upload;
