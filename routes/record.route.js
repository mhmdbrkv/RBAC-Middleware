const {
  getRecords,
  getOneRecord,
} = require("../controllers/record.controller");

const { checkAuthenticated } = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", checkAuthenticated, getRecords);
router.get("/:id", checkAuthenticated, getOneRecord);
module.exports = router;
