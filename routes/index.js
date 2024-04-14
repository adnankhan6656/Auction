const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

module.exports = route;
