const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");

const profileGetController = async (req, res) => {
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("profile", {
    title: "Profile",
    text: "Mening Profilim",
    admin: Admin[0],
  });
};

module.exports = {
  profileGetController,
};
