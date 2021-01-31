const express = require("express");
const db = require("../models");

const router = express.Router();

// === HTML Routes ===
// Root Route
router.get("/", (req, res) => {
  res.render("index");
})

// View sign up form
router.get("/signup", (req, res) => {
  res.render("sign-up");
});

// View login form
router.get("/login", (req, res) => {
  res.render("login");
});

// View new game form
router.get("/games/new", (req, res) => {
  res.render("new-game");
});

// Add new game to database
router.post("/api/games/new", (req, res) => {
  console.log(req.body);
  db.Game.create((req.body)
    .then((createdGame) => {
      res.json(createdGame);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    }))
})
// === API Routes ===

module.exports = router;