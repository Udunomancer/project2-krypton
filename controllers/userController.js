const express = require("express");
const db = require("../models");

const userRouter = express.Router();

router.get("/signup", (req, res) => {
  res.render("sign-up");
});

module.exports = userRouter;