const fetchData = require("../utils/pg");

const getQuery = `
    SELECT * FROM Teachers t JOIN courses c ON t.teacher_direction = c.id;
`;

const postQuery = `
INSERT INTO Teachers(
    teacher_name,
    teacher_surname,
    teacher_phone_num,
    teacher_img,
    teacher_direction,
    created_by_admin
) VALUES ($1,$2,$3,$4,$5,$6)
`;

const updateQuery = `
    UPDATE Teachers SET 
    teacher_phone_num = $1
    WHERE id = $2
`;

const deleteQuery = `
  DELETE FROM Teachers WHERE id = $1
`;

const deleteGroupQuery = `
  UPDATE groups SET teacher_id = NULL WHERE teacher_id = $1
`;

const allTeachers = async () => {
  const allteachers = await fetchData(getQuery);
  return allteachers;
};

const postTeacher = async (...reqBody) => {
  const [
    teacher_name,
    teacher_surname,
    teacher_phone,
    imgPath,
    teacher_direction,
    admin_id,
  ] = reqBody;
  return await fetchData(
    postQuery,
    teacher_name,
    teacher_surname,
    teacher_phone,
    imgPath,
    teacher_direction,
    admin_id
  );
};

const updateTeacher = async (...reqBody) => {
  const [teacher_phone_num, teacher_id] = reqBody;
  return await fetchData(updateQuery, teacher_phone_num, teacher_id);
};

const deleteTeacher = async (id) => {
  await fetchData(deleteGroupQuery, id);
  await fetchData(deleteQuery, id);
  return {
    msg: "Deleted!",
  };
};

module.exports = {
  allTeachers,
  postTeacher,
  updateTeacher,
  deleteTeacher,
};
