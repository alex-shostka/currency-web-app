const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const sha256 = require("sha256");
const Admin = require("./models/admin");

mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// passport.js
const session = require("express-session");
const passport = require("passport");
const passportSession = require("passport-session");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({
    usernameField: 'adminame',
  },
    function (username, password, done) {
    const passwordHash = sha256(password);
    Admin.findOne({ adminame: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password != passwordHash) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(3000);
