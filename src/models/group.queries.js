const fetchData = require("../utils/pg");

const getQuery = `
  SELECT g.id, g.group_title, g.day_lesson, g.time_lesson, c.course_title, t.id AS teacher_id, t.teacher_name, t.teacher_surname, t.teacher_phone_num, t.teacher_img FROM groups AS g LEFT JOIN teachers AS t ON g.teacher_id = t.id JOIN courses AS c ON g.course_id = c.id
`;

const findStudentsInGroupQuery = `
  SELECT * FROM groups JOIN students ON groups.id = students.group_id
`;

const groupQuery = `
  SELECT * FROM groups;
`;

const teacher = `
  SELECT t.teacher_name, t.id FROM courses AS c JOIN teachers AS t ON c.id = t.teacher_direction WHERE c.id = $1
`;

const postQuery = `
    INSERT INTO groups(
        group_title,
        day_lesson,
        time_lesson,
        teacher_id,
        course_id,
        created_by_admin     
    ) VALUES( $1, $2, $3, $4, $5, $6 )
`;

const updateQuery = `
    UPDATE groups SET  
    day_lesson = $1,
    time_lesson = $2,
    teacher_id = $3,
    course_id = $4
    WHERE 
    group_title = $5 
`;

const deleteQuery = `
    DELETE FROM groups WHERE id = $1 CASCADE 
`;

const Teacher = async (id) => {
  const teacherData = await fetchData(teacher, id);
  return teacherData;
};

const Groups = async () => {
  const groups = await fetchData(getQuery);
  return groups;
};

const groups = async () => {
  return await fetchData(groupQuery);
};
const studentsInGroup = async () => {
  return await fetchData(findStudentsInGroupQuery);
};

const postGroup = async (...reqBody) => {
  const [
    group_title,
    group_direction,
    day_lesson,
    time_lesson,
    teacher_id,
    admin_id,
  ] = reqBody;

  return await fetchData(
    postQuery,
    group_title,
    day_lesson,
    time_lesson,
    teacher_id,
    group_direction,
    admin_id
  );
};

const updateGroup = async (...reqBody) => {
  const [group_title, day_lesson, time_lesson, teacher_id, course_id] = reqBody;

  return await fetchData(
    updateQuery,
    day_lesson,
    time_lesson,
    teacher_id,
    course_id,
    group_title
  );
};

const deleteGroup = async (id) => {
  return await fetchData(deleteQuery, id);
};

module.exports = {
  Groups,
  postGroup,
  updateGroup,
  deleteGroup,
  Teacher,
  studentsInGroup,
  groups,
};
