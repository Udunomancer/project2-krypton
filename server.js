// testing branch protected
// === Express and Handlebars Dependencies ===
const path = require('path');
const express = require("express");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// === Create new Express server ===
const app = express();
const db = require("./models");
const controller = require("./controllers/controller");

const PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Middleware: Handlebars ---
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.use(controller);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
