const {
  login,
  register,
  logout,
  getLogin,
  getRegister,
} = require("../controllers/auth.controller");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/auth.middleware");

const express = require("express");
const router = express.Router();

router
  .route("/login")
  .post(checkNotAuthenticated, login())
  .get(checkNotAuthenticated, getLogin);

router
  .route("/register")
  .post(checkNotAuthenticated, register)
  .get(checkNotAuthenticated, getRegister);

router.delete("/logout", checkAuthenticated, logout);

module.exports = router;
