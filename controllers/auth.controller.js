const users = require("../config/users");
const passport = require("passport");
const bcrypt = require("bcrypt");

const getLogin = (req, res, next) => {
  res.render("login");
};

const getRegister = (req, res, next) => {
  res.render("register", { message: null });
};

const login = () => {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  });
};

const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (users.find((user) => user.email === email)) {
    return res
      .status(409)
      .render("register", { message: "Email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).redirect("/auth/login");
  } catch (error) {
    console.log(`Error with register controller: ${error}`);
    res.status(500).redirect("/auth/register");
  }
};

const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).redirect("/auth/login");
  });
};

module.exports = {
  login,
  register,
  logout,
  getLogin,
  getRegister,
};
