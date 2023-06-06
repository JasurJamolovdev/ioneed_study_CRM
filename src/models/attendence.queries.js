const fetchData = require("../utils/pg");

const payedStudentsQuery = `
    SELECT p.id, s.student_name FROM payments AS p JOIN students AS s ON p.student_id = s.id JOIN groups AS g ON g.id = s.group_id WHERE g.id = $1 and p.payment = true 
`;

const existingAttendance = `
    SELECT * FROM attendence WHERE student_id = $1 AND date_trunc('day', dateA) = CURRENT_DATE
`;
const updateAttend = `
    UPDATE attendence SET attendence = $1 WHERE student_id = $2 AND date_trunc('day', dateA) = CURRENT_DATE
`;

const GroupByIdQuery = `
SELECT
    g.id AS group_id,
    g.group_title,
    g.day_lesson,
    g.time_lesson,
    s.id AS student_id,
    s.student_name,
    s.student_surname,
    s.student_img,
    t.id AS teacher_id,
    t.teacher_name,
    t.teacher_surname,
    t.teacher_phone_num,
    t.teacher_img
FROM
    groups AS g
    JOIN students AS s ON s.group_id = g.id
    JOIN teachers AS t ON t.id = g.teacher_id
WHERE
    g.id = $1
`;

const GroupInStudentsQuery = `
    SELECT students.id FROM students JOIN groups ON students.group_id = groups.id WHERE groups.id = $1
`;

const studentsAttendanceFalseQuery = `
    SELECT s.student_name, s.student_surname, TO_CHAR(a.datea, 'DD-MM-YYYY') AS formatted_date FROM students AS s JOIN attendence AS a ON  s.id = a.student_id  JOIN groups AS g ON g.id = s.group_id  WHERE a.attendence = false and a.datea = CURRENT_DATE and g.id = $1
`;

const postAttendenceQuery = `
    INSERT INTO attendence(
        student_id,
        attendence,
        created_by_admin
    ) VALUES ($1, $2, $3)
`;

const GroupbyId = async (group_id) => {
  return await fetchData(GroupByIdQuery, group_id);
};

const GroupInStudents = async (group_id) => {
  return await fetchData(GroupInStudentsQuery, group_id);
};

const getAllNotAttendStudent = async (group_id) => {
  return await fetchData(studentsAttendanceFalseQuery, group_id);
};
const payedStudents = async (group_id) => {
  return await fetchData(payedStudentsQuery, group_id);
};

const postAttendence = async (attend, student_id, token) => {
  console.log(attend, student_id, token);
  return await fetchData(postAttendenceQuery, student_id, attend, token);
};

const existAttendance = async (student_id) => {
  return await fetchData(existingAttendance, student_id);
};

const updateAttendence = async (attend, student_id) => {
  return await fetchData(updateAttend, attend, student_id);
};
module.exports = {
  GroupbyId,
  GroupInStudents,
  payedStudents,
  postAttendence,
  getAllNotAttendStudent,
  existAttendance,
  updateAttendence,
};
