const jwt = require("jsonwebtoken");
const {
  Groups,
  deleteGroup,
  postGroup,
  updateGroup,
  Teacher,
  studentsInGroup,
  groups,
} = require("../models/group.queries");
const { getOneAdmin } = require("../models/auth.queries");
const { getCourses } = require("../models/courses.queries");
const { allTeachers } = require("../models/teachers.queries");

//GET CONTROLLER
const GroupPageController = async (req, res) => {
  const AllData = await Groups();
  const Courses = await getCourses();
  const students = await studentsInGroup();
  const teachers = await allTeachers();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("guruxlar", {
    title: "Guruhlar",
    text: "Guruhlar",
    course: Courses,
    groups: AllData,
    studentsGroup: students,
    admin: Admin[0],
    teachers: teachers,
  });
};

//GET CONTROLLER
const GroupPageController2 = (req, res) => {
  res.render("guruxlar2", { title: "Guruhlar", text: "Guruhlar" });
};
const selectOnCourse = async (req, res) => {
  const { course_id } = req.body;
  const Teachers = await Teacher(course_id);
  res.status(200).json(Teachers);
};
//POST CONTROLLER
const groupPostcontroller = async (req, res) => {
  try {
    const {
      group_title,
      group_direction,
      day_lesson,
      time_lesson,
      teacher_id,
    } = req.body;
    const groups = await Groups();
    const foundGroup = groups.find((g) => g.group_title === group_title);
    if (foundGroup) {
      console.log("group already eixst!");
      res.send("group already eixst!");
    } else {
      const { token } = req.cookies;
      const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
      await postGroup(
        group_title,
        group_direction,
        day_lesson,
        time_lesson,
        teacher_id,
        admin_id
      );
      res.status(200).redirect("/groups");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const groupUpdateController = async (req, res) => {
  const { group_title, day_lesson, time_lesson, teacher_id, course_id } =
    req.body;
  const group = await groups();
  const foundGroup = group.find((g) => {
    return g.group_title === group_title;
  });
  if (!foundGroup) {
    console.log("group not found!");
    res.json({
      msg: "Group not found!",
    });
  } else {
    group_title ? group_title : foundGroup.group_title;
    day_lesson ? day_lesson : foundGroup.day_lesson;
    time_lesson ? time_lesson : foundGroup.time_lesson;
    teacher_id ? teacher_id : foundGroup.teacher_id;
    course_id ? course_id : foundGroup.course_id;

    const upt = await updateGroup(
      group_title,
      day_lesson,
      time_lesson,
      teacher_id,
      course_id
    );
    console.log(upt);
    res.status(200).redirect("/groups");
  }
};

module.exports = {
  GroupPageController,
  GroupPageController2,
  selectOnCourse,
  groupPostcontroller,
  groupUpdateController,
};
