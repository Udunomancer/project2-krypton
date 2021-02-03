const { response } = require("express");
const express = require("express");
const { sequelize } = require("../models");
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

// --- View Search Results Page ---
router.get("/search", (req, res) => {
  // res.render("search");
  db.GameDescription.findAll()
  .then((allGames) => {
    const hbsObject = { games: allGames };
    res.render("search", hbsObject);
  })
});

// --- View Search Results Page with Search Term ---
router.get("/search/:title", (req, res) => {
  // res.render("search");
  db.GameDescription.findAll({
    where: { 
      gameTitle: sequelize.where(sequelize.fn("LOWER", sequelize.col("gameTitle")), "LIKE", "%" + req.params.title + "%")
    }
  })
  .then((allGames) => {
    const hbsObject = { games: allGames };
    res.render("search", hbsObject);
  })
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
  db.User.findAll()
    .then((allUsers) => {
      const hbsObject = { users: allUsers };
      res.render("new-game", hbsObject);
    });
});

// --- View Individual Game Description Page ---
router.get("/game-description/:id", function(req, res) {
  let hbsObject = {};
  let searchId = parseInt(req.params.id);
  db.GameDescription.findAll({
    where: { id: searchId },
    include: db.GameUnit
  })
  .then((game) => {
    hbsObject.game = game[0].dataValues;
    db.User.findAll().then((allUsers) => {
      hbsObject.users = allUsers;
      res.render("single-game-description", hbsObject);
    })
  })
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
  }).then((gameDesc) => {
    let UserID = parseInt(req.body.gameOwner);
    let gameDescID = gameDesc.dataValues.id;
    db.GameUnit.create({
       rented: false,
       GameDescriptionId: gameDescID,
       UserId: UserID
    }, {
       fields: ["rented", "GameDescriptionId", "UserId"]
    })
  })
});

// === API Routes ===
// Route to render all trains to a page
router.get("/games", (req, res) => {
  // db.User.findAll({}).then(function (data) {
    db.GameUnit.findAll({
      include: [db.User],
    })
      .then(function (games) {
        hbsObject = {
          gameunits: []
        };
        for(let i = 0; i < games.length; i++) {
          tempObj = {};
          tempObj.id = games[i].id;
          tempObj.rented = games[i].rented;
          tempObj.userName = games[i].User.name;
          tempObj.userEmail = games[i].User.email;
          hbsObject.gameunits.push(tempObj);
        }
        console.log(hbsObject);
        res.render("all-games", hbsObject);
        // res.render("all-games", { gameunits: games, users: data });
        // res.json(games);
        // console.log(games);
      })
      .catch((err) => {
        console.log(err);

        res.status(500).end();
      });
  });
// });

router.post("/api/games/new", (req, res) => {
  db.GameUnit.create({
    rented: false,
    GameDescriptionId: 2,
    UserId: 2
  }, {
    fields: ["rented", "GameDescriptionId", "UserId"]
  }).then((response) => {
    console.log("End of server route")
    res.status(200).end();
  }).catch((err) => {
    res.status(500).end();
  })
})

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

router.delete("/api/games/:id", (req, res) => {
  db.GameUnit.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});


router.get("/api/user", (req, res) => {
  db.User.findAll()
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(404).end();
  })
})

router.put("/api/games/:id", function(req, res) {
  var condition = "id: " + req.params.id;

  db.GameUnit.update({
    rented: req.body.rented
  }, {where: {
    id: req.params.id
  }}).then((response) => {
    if (response.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Route to return all games that match title search term
// router.get("/api/game-description/:title", (req, res) => {
//   db.GameDescription.findAll({
//     where: {
//       gameTitle: sequelize.where(sequelize.fn("LOWER", sequelize.col("gameTitle")), "LIKE", "%" + req.params.title + "%")
//     }
//   })
//     .then((allGames) => {
//       res.json(allGames);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).end();
//     })
// })

module.exports = router;
