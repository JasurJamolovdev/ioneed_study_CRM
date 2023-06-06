const express = require("express");
const router = express.Router();
const {
  StudentsPagesController,
  studentsPostController,
  studentDeleteController,
  studentsUpdateController,
  selectGroup,
} = require("../controllers/students.controller");
const { isAuth } = require("../middlewares/isAuth");
router.get("/oquvchilar", isAuth, StudentsPagesController);
router.post("/postStudent", studentsPostController);
router.post("/deleteStudent", studentDeleteController);
router.post("/updateStudent", studentsUpdateController);
router.post("/selectGroup", selectGroup);
module.exports = router;
