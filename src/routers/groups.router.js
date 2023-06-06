const express = require("express");
const router = express.Router();
const {
  GroupPageController,
  selectOnCourse,
  groupPostcontroller,
  groupUpdateController,
} = require("../controllers/groups.controller");
const { isAuth } = require("../middlewares/isAuth");
router.get("/groups", isAuth, GroupPageController);
router.post("/selectOnCourse", selectOnCourse);
router.post("/postGroup", groupPostcontroller);
router.post("/updateGroup", groupUpdateController);

module.exports = router;
