const { cloudinaryUpload } = require("../utils/cloudinary");
const path = require("path");
const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");
const {
  allTeachers,
  postTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../models/teachers.queries");

const { getCourses } = require("../models/courses.queries");
// TEACHER GET CONTROLLER
const teachersGetController = async (req, res) => {
  const course = await getCourses();
  const teacher = await allTeachers();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("uqituvchilar", {
    title: "O'qituvchilar",
    text: "O'qituvchilar",
    courses: course,
    teachers: teacher,
    admin: Admin[0],
  });
};

// TEACHER POST CONTROLLER
const teachersPostController = async (req, res) => {
  try {
    const { teacher_name, teacher_surname, teacher_phone, teacher_direction } =
      req.body;
    const { teacher_img } = req.files;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/teachers/",
      teacher_img.name
    );
    teacher_img.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const imgPath = uploadedImg.url;
    const Teachers = await allTeachers();
    const foundTeacher = Teachers.find(
      (t) => t.teacher_phone_num === teacher_phone
    );
    if (foundTeacher) {
      console.log("Teacher Already Exists!");
      res.end("Teacher Already Exists!");
    }
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    await postTeacher(
      teacher_name,
      teacher_surname,
      teacher_phone,
      imgPath,
      teacher_direction,
      admin_id
    );
    res.status(200).redirect("/teachers");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

//TEACHER UPDATE CONTROLLER
const teacherUpdateController = async (req, res) => {
  try {
    const { teacher_id, teacher_phone_num } = req.body;
    const Teachers = await allTeachers();
    const foundTeacher = Teachers.find((t) => t.id === teacher_id);
    foundLogger(foundTeacher);
    await updateTeacher(teacher_phone_num, teacher_id);
    res.status(200).redirect("/teachers");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

//TEACHER DELETE CONTROLLER
const teacherDeleteController = async (req, res) => {
  const { teacher_id } = req.body;
  const Teachers = await allTeachers();
  const foundTeacher = Teachers.find((t) => t.id === teacher_id);
  foundLogger(foundTeacher);
  await deleteTeacher(teacher_id);
  res.status(200).redirect("/teachers");
};

let foundLogger = (found) => {
  if (!found) {
    console.log("Teacher not found!");
  }
};

module.exports = {
  teachersGetController,
  teachersPostController,
  teacherDeleteController,
  teacherUpdateController,
};
