const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

mongoose.connect("mongodb://127.0.0.1:27017/week7_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

