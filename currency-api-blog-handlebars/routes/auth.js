const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Client = require("../models/client");
const sha256 = require("sha256");
const passport = require("passport");

// render admin
router.get("/homePage", authenticationMiddleware(), async function (req, res, next) {
  const user = req.user;
  res.render("homePage", { user });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* GET logout */
router.get("/logout", function (req, res, next) {
  // req.logout();
  req.session.destroy();
  res.redirect("/auth/login");
});
// TODO: валидация данных
router.post("/signup", async function (req, res, next) {
  try {
    const { adminame, password } = req.body;
    const passwordHash = sha256(password);
    const getNewAdmin = await Admin.findOne({ adminame: adminame });
    if (getNewAdmin) {
      return res.status(400).json({ message: "Такой пользователь существует" });
    }
    const newAdmin = new Admin({ adminame, password: passwordHash });
    await newAdmin.save();
    res.redirect("/auth/homePage");
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/homePage",
    failureRedirect: "/auth/login",
    // failureFlash: true,
  })
);

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  };
}

module.exports = router;
