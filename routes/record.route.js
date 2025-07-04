const {
  getRecords,
  getOneRecord,
} = require("../controllers/record.controller");

const { checkAuthenticated } = require("../middleware/auth.middleware");
const { checkPermissions } = require("../middleware/rbac.middleware");

const express = require("express");
const router = express.Router();

router.use(checkPermissions("create_record"));

router.get("/", checkAuthenticated, getRecords);

router.get("/:id", checkAuthenticated, getOneRecord);

module.exports = router;
