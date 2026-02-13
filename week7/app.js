const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./src/routes/user");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/week7", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
