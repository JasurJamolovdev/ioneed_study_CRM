const { Students } = require("../models/students.queries");
const { allTeachers } = require("../models/teachers.queries");
const { Groups } = require("../models/group.queries");
const { deletedStudents } = require("../models/students.queries");
const { getMonthlyStudents } = require("../models/students.queries");
const { getOneAdmin } = require("../models/auth.queries");
const jwt = require("jsonwebtoken");

const IndexPageController = async (req, res) => {
  const { token } = req.cookies;
  const students = await Students();
  const teachers = await allTeachers();
  const groups = await Groups();
  const dStudents = await deletedStudents();
  const monthlyStud = await getMonthlyStudents();
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("index", {
    title: "Home",
    text: "Xisobot",
    admin: Admin[0],
    stud: students.length,
    teach: teachers.length,
    gro: groups.length,
    dstud: dStudents.length,
    mStud: monthlyStud,
  });
};

module.exports = {
  IndexPageController,
};
