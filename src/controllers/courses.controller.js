const jwt = require("jsonwebtoken");
const {
  insertCourse,
  getCourses,
  deleteCourse,
  courseWithAdmin,
  UpdateCourse,
} = require("../models/courses.queries");
const { getOneAdmin } = require("../models/auth.queries");
//foundOneCoursebyId api
let Courses;
const foundCoursee = async (course_id) => {
  Courses = await getCourses();
  const foundCourse = Courses.find((c) => (c.id = course_id));
  return foundCourse;
};

//GET CONTROLLER
const coursesGetController = async (req, res) => {
  const allData = await courseWithAdmin();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("courses", {
    title: "Kurslar",
    text: "Kurslar",
    course: allData,
    admin: Admin[0],
  });
};

//POST CONTROLLER
const coursesPostController = async (req, res) => {
  try {
    const { course_name } = req.body;
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    const Courses = await getCourses();
    if (Courses === []) {
      await insertCourse(course_name, admin_id);
      res.status(200).redirect("/courses");
    } else {
      const foundCourse = Courses.find((c) => c.course_title === course_name);
      if (!foundCourse) {
        await insertCourse(course_name, admin_id);
        res.status(200).redirect("/courses");
      } else {
        res.send("Course already exists!");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE CONTROLLER
const coursesDeleteController = async (req, res) => {
  try {
    const { course_id } = req.body;
    foundLogger(foundCoursee(course_id));
    await deleteCourse(course_id);
    res.status(200).redirect("/courses");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

//DELETE CONTROLLER
const coursesUpdateController = async (req, res) => {
  try {
    const { course_id, course_title } = req.body;
    const foundCourse = foundCoursee(course_id);
    foundLogger(foundCourse);
    course_title ? course_title : foundCourse.course_title;
    await UpdateCourse(course_title, course_id);
    res.status(200).redirect("/courses");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

let foundLogger = (found) => {
  if (!found) {
    console.log("Course not found!");
  }
};

module.exports = {
  coursesGetController,
  coursesPostController,
  coursesDeleteController,
  coursesUpdateController,
};
