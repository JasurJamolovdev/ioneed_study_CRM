const fetchData = require("../utils/pg");

const getWithCourses = `
    SELECT c.id, c.course_title FROM courses AS c
`;

const DeletedSQuery = `
    SELECT * FROM deleted_students;
`;
const getStudents = `
    SELECT * FROM students s JOIN courses c ON s.direction = c.id
`;
const monthlyStudentsquery = `
  SELECT TO_CHAR(DATE_TRUNC('month', registrated_at), 'Month') AS month_name, COUNT(*) AS reader_count
  FROM students
  GROUP BY month_name
  ORDER BY month_name
`;

const insertQuery = `
INSERT INTO Students(
    student_name,
    student_surname,
    student_phone_num,
    student_img,
    parents_name,
    parents_phone_num,
    direction,
    group_id,
    created_by_admin
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
`;

const updateQuery = `
    UPDATE students SET 
    student_name = $1,
    student_surname = $2,
    student_phone_num = $3,
    student_img = $4,
    parents_name = $5,
    parents_phone_num = $6,
    direction = $7,
    group_id = $8
    WHERE id = $9
`;

const courseWithGroupQuery = `
  SELECT * FROM courses AS c JOIN groups AS g ON c.id = g.course_id WHERE c.id = $1 
`;
const deleteQuery1 = "DELETE FROM attendence WHERE student_id = $1;";
const deleteQuery2 = "DELETE FROM Students WHERE id = $1;";

const getWithCourse = async () => {
  const courses = await fetchData(getWithCourses);
  return courses;
};
const getMonthlyStudents = async () => {
  return await fetchData(monthlyStudentsquery);
};

const Students = async () => {
  const students = await fetchData(getStudents);
  return students;
};

const insertStudent = async (...reqBody) => {
  const [
    name,
    surname,
    phone,
    direction,
    parentsName,
    parentsPhone,
    uploadedImg,
    group_id,
    admin_id,
  ] = reqBody;
  return await fetchData(
    insertQuery,
    name,
    surname,
    phone,
    uploadedImg,
    parentsName,
    parentsPhone,
    direction,
    group_id,
    admin_id
  );
};

const coursewithgroup = async (id) => {
  const groups = await fetchData(courseWithGroupQuery, id);
  return groups;
};

const updateStudent = async (...reqBody) => {
  const [
    student_id,
    name,
    surname,
    phone,
    direction,
    parentsName,
    parentsPhone,
    uploadedImg,
    group_id,
  ] = reqBody;
  return await fetchData(
    updateQuery,
    student_id,
    name,
    surname,
    phone,
    direction,
    parentsName,
    parentsPhone,
    uploadedImg,
    group_id
  );
};

const deleteStudent = async (id) => {
  await fetchData(deleteQuery1, id);
  await fetchData(deleteQuery2, id);
  return {
    msg: "deleted!",
  };
};

const deletedStudents = async () => {
  return await fetchData(DeletedSQuery);
};

module.exports = {
  getWithCourse,
  Students,
  insertStudent,
  updateStudent,
  deleteStudent,
  coursewithgroup,
  deletedStudents,
  getMonthlyStudents,
};
