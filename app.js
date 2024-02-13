const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const contactsRouter = require("./routers/contactsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));



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
