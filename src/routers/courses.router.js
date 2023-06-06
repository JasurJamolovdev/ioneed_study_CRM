const express = require("express");
const {
  coursesGetController,
  coursesPostController,
  coursesDeleteController,
  coursesUpdateController,
} = require("../controllers/courses.controller");
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
router.get("/courses", isAuth, coursesGetController);
router.post("/courses", coursesPostController);
router.post("/deleteCourse", coursesDeleteController);
router.post("/updateCourse", coursesUpdateController);

module.exports = router;
