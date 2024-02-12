const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const contactsRouter = require("./routers/contactsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use("/public", express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/avatars", upload.single("avatar"), (req, res) => {
  res.json({ message: "Avatar uploaded successfully" });
});
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter); 

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
