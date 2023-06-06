const express = require("express");
const router = express.Router();
const {
  DavomatPageController,
  getDavomatById,
  postDavomatController,
} = require("../controllers/davomat.controller");
const { isAuth } = require("../middlewares/isAuth");

router.get("/davomat", isAuth, DavomatPageController);
router.get("/davomat/:group_id", getDavomatById);
router.post("/attend", postDavomatController);
module.exports = router;
