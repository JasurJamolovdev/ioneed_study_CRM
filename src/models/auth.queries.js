const fetchData = require("../utils/pg");

const insertQuery = `
    INSERT INTO Admins(
        name,
        email,
        password,
        profileImg
    )
    VALUES
    (
        $1,
        $2,
        $3,
        $4
    )
            
   `;

const getQuery = `
        SELECT * FROM admins 
    
    `;

const getOneAdminById = `
  SELECT * FROM admins WHERE id = $1  
`;

const insertAdmins = async (...reqBody) => {
  const [user_name, user_email, hashedPsw, profileImgPath] = reqBody;
  return await fetchData(
    insertQuery,
    user_name,
    user_email,
    hashedPsw,
    profileImgPath
  );
};

const getAdmins = async () => {
  const Admins = await fetchData(getQuery);
  return Admins;
};

const getOneAdmin = async (user_id) => {
  return await fetchData(getOneAdminById, user_id);
};

module.exports = {
  insertAdmins,
  getAdmins,
  getOneAdmin,
};
