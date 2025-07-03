const { getHome } = require("../controllers/home.controller");
const { checkAuthenticated } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/", checkAuthenticated, getHome);
module.exports = router;
