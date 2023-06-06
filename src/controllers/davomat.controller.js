const { Groups } = require("../models/group.queries");
const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");
const {
  GroupbyId,
  GroupInStudents,
  payedStudents,
  postAttendence,
  getAllNotAttendStudent,
  existAttendance,
  updateAttendence,
} = require("../models/attendence.queries");
//GET CONTROLLER
const DavomatPageController = async (req, res) => {
  const groups = await Groups();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("davomat", {
    title: "Davomat",
    text: "Davomat",
    groups: groups,
    admin: Admin[0],
  });
};

const getDavomatById = async (req, res) => {
  const group_id = req.params.group_id;
  const notattend = await getAllNotAttendStudent(group_id);
  const result = await GroupbyId(group_id);
  const students = await GroupInStudents(group_id);
  const SPCount = await payedStudents(group_id);
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);

  res.render("davomat2", {
    title: "Davomat Olish",
    text: "Davomat",
    groups: result,
    studentsCount: students.length,
    pCount: SPCount.length,
    nAttend: notattend,
    admin: Admin[0],
  });
};

const postDavomatController = async (req, res) => {
  let { attend, student_id } = req.body;
  if (attend === "true") {
    attend = true;
  } else {
    attend = false;
  }
  console.log(attend);
  // console.log(req.body);
  const resS = await existAttendance(student_id);
  if (resS.rowCount === 0 || resS.length == 0) {
    const { token } = req.cookies;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const result = await postAttendence(attend, student_id, verifiedToken.id);
    res.status(200).send("inserted!");
  } else if (resS.length >= 1) {
    await updateAttendence(attend, student_id);
    res.status(200).send("updated!");
  }
};

module.exports = {
  DavomatPageController,
  getDavomatById,
  postDavomatController,
};
