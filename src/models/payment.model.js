const fetchData = require("../utils/pg");

const getQuery = `
    SELECT p.id, p.student_id, p.payment, TO_CHAR(p.datePay, 'DD-MM-YYYY') AS formatted_date, p.checkPic, s.student_name FROM payments AS p JOIN students AS s ON p.student_id = s.id
`;

const StudentsPayCount = `
  SELECT s.id, p.payment FROM groups AS g JOIN students AS s ON  g.id = s.group_id JOIN 
  payments AS p ON s.id = p.student_id WHERE g.id = $1 and p.payment = true  
`;

const insertQuery = `
    INSERT INTO payments(
        student_id,
        payment,
        datePay,
        checkPic,
        created_by_admin ,
        course_id
    ) VALUES ($1, $2, $3, $4, $5, $6)
`;

const updateQuery = `
    UPDATE payments SET payment = $1, datePay = $2, checkPic = $3 WHERE id = $4 and created_by_admin = $5
`;

const deleteQuery = `
    DELETE FROM payments WHERE id = $1 and created_by_admin = $2
`;

const getPayments = async () => {
  const payments = await fetchData(getQuery);
  return payments;
};

const postPayment = async (...args) => {
  const [student_id, payment, datePay, checkPic, created_by_admin, course_id] =
    args;
  return await fetchData(
    insertQuery,
    student_id,
    payment,
    datePay,
    checkPic,
    created_by_admin,
    course_id
  );
};

const StudentsPayingCount = async (group_id) => {
  return await fetchData(StudentsPayCount, group_id);
};
const updatePayment = async (...args) => {
  const [id, payment, datePay, checkPic, created_by_admin] = args;
  return await fetchData(
    updateQuery,
    payment,
    datePay,
    checkPic,
    id,
    created_by_admin
  );
};

const deletePayment = async (id, created_by_admin) => {
  return await fetchData(deleteQuery, id, created_by_admin);
};

module.exports = {
  getPayments,
  postPayment,
  updatePayment,
  deletePayment,
  StudentsPayingCount,
};
