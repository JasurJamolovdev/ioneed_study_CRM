const express = require("express");
const router = express.Router();
const { profileGetController } = require("../controllers/profileController");
const { isAuth } = require("../middlewares/isAuth");
router.get("/profile", isAuth, profileGetController);

module.exports = router;
