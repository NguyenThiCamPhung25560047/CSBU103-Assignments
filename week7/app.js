const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// connect DB here
require("./src/config/db");

const userRoutes = require("./src/routes/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/", userRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
