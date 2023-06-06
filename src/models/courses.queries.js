const fetchData = require("../utils/pg");

const insertQuery = `
  INSERT INTO courses(
      course_title,
      created_by_admin
  ) VALUES (
      $1,
      $2
  )
  RETURNING *
`;

const getQuery = `
  SELECT * FROM courses
`;

const deleteQuery = `
    DELETE FROM courses WHERE id = $1
`;

const deleteGroupQuery = `
    DELETE FROM groups WHERE course_id = $1
`;
const deletestudentQuery = `
  DELETE FROM students
  USING groups
  WHERE groups.id = students.group_id
    AND groups.course_id = $1
`;

const coursesWithAdmin = `
    SELECT c.id, c.course_title, c.created_at, a.name
    FROM courses AS c JOIN admins AS a ON c.created_by_admin = a.id  
`;

const updateQuery = `
    UPDATE courses SET course_title = $1 WHERE id = $2
`;

const insertCourse = async (...reqBody) => {
  const [course_name, admin_id] = reqBody;
  return await fetchData(insertQuery, course_name, admin_id);
};

const getCourses = async () => {
  const Courses = await fetchData(getQuery);
  return Courses;
};

const deleteCourse = async (id) => {
  await fetchData(deletestudentQuery, id);
  await fetchData(deleteGroupQuery, id);
  await fetchData(deleteQuery, id);
  return {
    msg: "deleted!",
  };
};

const courseWithAdmin = async () => {
  const CwithA = await fetchData(coursesWithAdmin);
  return CwithA;
};

const UpdateCourse = async (...reqBody) => {
  const [course_title, course_id] = reqBody;
  return await fetchData(updateQuery, course_title, course_id);
};

module.exports = {
  insertCourse,
  getCourses,
  deleteCourse,
  courseWithAdmin,
  UpdateCourse,
};
