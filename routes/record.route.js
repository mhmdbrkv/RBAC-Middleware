const {
  getRecords,
  getOneRecord,
} = require("../controllers/record.controller");

const { checkAuthenticated } = require("../middlewares/auth.middleware");
const { checkPermissions } = require("../middlewares/rbac.middleware");

const express = require("express");
const router = express.Router();

router.use(checkPermissions("read_record"));

router.get("/", checkAuthenticated, getRecords);

router.get("/:id", checkAuthenticated, getOneRecord);

module.exports = router;
