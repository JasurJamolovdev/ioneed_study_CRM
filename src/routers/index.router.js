const express = require("express");
const router = express.Router();
const { IndexPageController } = require("../controllers/index.controller");
const { isAuth } = require("../middlewares/isAuth");
router.get("/", isAuth, IndexPageController);

module.exports = router;
