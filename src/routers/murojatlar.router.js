const express = require("express");
const router = express.Router();
const {
  MurojatPageController,
} = require("../controllers/murojatlar.controller");

router.get("/murojatlar", MurojatPageController);

module.exports = router;
