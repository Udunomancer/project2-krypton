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

// Route to render all trains to a page
router.get("/games", (req, res) => {
  db.Game.findAll()
    .then((allGames) => {
      res.render("all-games", { games: allGames });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});


module.exports = router;