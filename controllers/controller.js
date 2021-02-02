const { response } = require("express");
const express = require("express");
const db = require("../models");

const router = express.Router();

// === HTML Routes ===
// Route that will return and display home page (index)
router.get("/", (req, res) => {
  res.render("index");
})

// Route that will return and display new user form
router.get("/signup", (req, res) => {
  res.render("sign-up");
});

// Route that will return and display the login page (not used at this time)
router.get("/login", (req, res) => {
  res.render("login");
});

// --- View Search Results Page ---
router.get("/search", (req, res) => {
  res.render("search");
});

// --- View Search Results Page with Search Term ---
router.get("/search?title=:title", (req, res) => {
  res.render("search");
});

// --- View Individual Game Description Page ---
router.get("/game-description/:id", function(req, res) {
  res.render("single-game-description");
});

// Route to create a new user
// User entered details from /signup sent to database
router.post("/api/signup", function (req, res) {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function () {
      res.status(200).end();
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route that will return and display the form to add a new game description
router.get("/game-description/new", (req, res) => {
  db.User.findAll()
    .then((allUsers) => {
      const hbsObject = { users: allUsers };
      res.render("new-game", hbsObject);
    });
});

// Add new game description to the GameDescription table
router.post("/api/game-description/new", (req, res) => {
  console.log(req.body);

  db.GameDescription.create({
    gameTitle: req.body.gameTitle,
    published: req.body.published,
    playerAge: req.body.playerAge,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    minPlayTime: req.body.minPlayTime,
    maxPlayTime: req.body.maxPlayTime,
    gameDescription: req.body.gameDescription
  }, {
    fields: [
      "gameTitle", "published", "playerAge", "published", "minPlayers", "maxPlayers",
      "minPlayTime", "maxPlayTime", "gameDescription"
    ]
  }).then(
    db.GameUnit.create({
      rented: false
    }, {
      fields: ["rented"]
    })
  )
});

// === API Routes ===
// Route to render all trains to a page
router.get("/games", (req, res) => {
  db.GameUnit.findAll()
    .then((allGames) => {
      res.render("all-games", { games: allGames });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

// Route to return all games that match title search term
router.get("/api/game-description/:title", (req, res) => {
  db.GameDescription.findAll()
    .then((allGames) => {
      res.json(allGames);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    })
})

module.exports = router;