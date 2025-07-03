require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const initPassport = require("./config/passport-config");
const methodOverride = require("method-override");
const users = require("./config/users");
const mountRoutes = require("./routes/index.js/index");
const authRoute = require("./routes/auth.route");
const homeRoute = require("./routes/home.route");
const recordRoute = require("./routes/record.route");

const app = express();
initPassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
