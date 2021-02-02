const express = require("express");
const db = require("../models");

const router = express.Router();

// === HTML Routes ===
// Route that will return and display home page (index)
router.get("/", (req, res) => {
  res.render("index");
});

// Route that will return and display new user form
router.get("/signup", (req, res) => {
  res.render("sign-up");
});

// Route that will return and display the login page (not used at this time)
router.get("/login", (req, res) => {
  res.render("login");
});

// Route to create a new user
// User entered details from /signup sent to database
router.post("/api/signup", function (req, res) {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
  res.render("new-game");
});

// Add new game description to the GameDescription table
router.post("/api/game-description/new", (req, res) => {
  console.log(req.body);
  // db.Game.create((req.body)
  //   .then((createdGame) => {
  //     res.json(createdGame);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).end();
  //   }))
  db.GameDescription.create(
    {
      gameTitle: req.body.gameTitle,
      playerAge: req.body.playerAge,
      published: req.body.published,
      minPlayers: req.body.minPlayers,
      maxPlayers: req.body.maxPlayers,
      minPlayTime: req.body.minPlayTime,
      maxPlayTime: req.body.maxPlayTime,
      gameDescription: req.body.gameDescription,
    },
    {
      fields: [
        "gameTitle",
        "playerAge",
        "published",
        "minPlayers",
        "maxPlayers",
        "minPlayTime",
        "maxPlayTime",
        "gameDescription",
      ],
    }
  );
});
// === API Routes ===
// Route to render all trains to a page
router.get("/games", (req, res) => {
  db.User.findAll({}).then(function (data) {
    db.GameUnit.findAll({
      include: [db.User],
    })
      .then(function (games) {
        res.render("all-games", { gameunits: games, users: data });
        // res.json(games);
        console.log(games);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).end();
      });
  });
});

router.get("/games/:userId", (req, res) => {
  db.User.findAll({}).then(function (data) {
    var query = {};
    if (req.params.userId) {
      query.UserId = req.params.userId;
    }

    db.GameUnit.findAll({
      where: query,
      include: [db.User],
    })
      .then(function (games) {
        res.render("all-games", { gameunits: games, users: data });
        // res.json(games);
        console.log(games);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).end();
      });
  });
});

module.exports = router;
