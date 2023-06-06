const { cloudinaryUpload } = require("../utils/cloudinary");
const path = require("path");
const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");
const {
  getWithCourse,
  Students,
  insertStudent,
  updateStudent,
  deleteStudent,
  coursewithgroup,
} = require("../models/students.queries");
const foundStudentByIdFunc = async (student_id) => {
  const students = await Students();
  const foundStudent = students.find((student) => student.id === student_id);
  return foundStudent;
};

//STUDENTS GET CONTROLLER
const StudentsPagesController = async (req, res) => {
  const studentS = await Students();
  const courseS = await getWithCourse();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("uquvchilar", {
    title: "O'quvchilar",
    text: "O'quvchilar",
    students: studentS,
    courses: courseS,
    admin: Admin[0],
  });
};

const selectGroup = async (req, res) => {
  const { course_id } = req.body;
  const groups = await coursewithgroup(course_id);

  res.json(groups);
};

//STUDENTS POST CONTROLLER
const studentsPostController = async (req, res) => {
  try {
    const {
      name,
      surname,
      phone,
      direction,
      parentsName,
      parentsPhone,
      group_id,
    } = req.body;
    // console.log(req.body);
    const { student_img } = req.files;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/students/",
      student_img.name
    );
    student_img.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const students = await Students();
    const foundStudent = students.find(
      (student) => student.student_phone_num === phone
    );
    if (foundStudent) {
      console.log("Student already exists!");
      res.end("Student already exist!");
    }
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    await insertStudent(
      name,
      surname,
      phone,
      direction,
      parentsName,
      parentsPhone,
      uploadedImg.secure_url,
      group_id,
      admin_id
    );
    res.status(200).redirect("/oquvchilar");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

//STUDENTS UPDATE CONTROLLER
const studentsUpdateController = async (req, res) => {
  try {
    const {
      student_id,
      name,
      surname,
      phone,
      direction,
      parentsName,
      parentsPhone,
      group_id,
    } = req.body;
    const { img } = req.files;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/students/",
      img.name
    );
    img.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const foundStudent = await foundStudentByIdFunc(student_id);
    foundLogger(foundStudent);

    name ? name : foundStudent.student_name,
      surname ? surname : foundStudent.student_surname,
      phone ? phone : foundStudent.student_phone_num,
      direction ? direction : foundStudent.direction,
      parentsName ? parentsName : foundStudent.parents_name,
      parentsPhone ? parentsPhone : foundStudent.parents_phone_num,
      uploadedImg ? uploadedImg : foundStudent.student_img,
      group_id ? group_id : foundStudent.group_id;

    await updateStudent(
      student_id,
      name,
      surname,
      phone,
      direction,
      parentsName,
      parentsPhone,
      img,
      group_id
    );
    res.status(200).redirect("/oquvchilar");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

//DELETE STUDENT CONTROLLER ]
const studentDeleteController = async (req, res) => {
  try {
    const { student_id } = req.body;
    const foundStudent = await foundStudentByIdFunc(student_id);
    foundLogger(foundStudent);
    await deleteStudent(student_id);
    res.status(200).redirect("/oquvchilar");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

let foundLogger = (found) => {
  if (!found) {
    console.log("Student not found!");
  }
};

module.exports = {
  StudentsPagesController,
  studentsPostController,
  studentsUpdateController,
  studentDeleteController,
  selectGroup,
};
