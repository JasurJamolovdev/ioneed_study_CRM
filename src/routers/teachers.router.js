const express = require("express");
const {
  teachersGetController,
  teachersPostController,
  teacherUpdateController,
  teacherDeleteController,
} = require("../controllers/teachers.controller");
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
router.get("/teachers", isAuth, teachersGetController);
router.post("/postTeacher", teachersPostController);
router.post("/updateTeacher", teacherUpdateController);
router.post("/deleteTeacher", teacherDeleteController);

module.exports = router;
