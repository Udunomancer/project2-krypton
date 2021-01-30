const express = require("express");
const db = require("../models");

const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  res.render("sign-up");
});

module.exports = userRouter;