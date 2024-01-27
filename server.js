const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running...");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
