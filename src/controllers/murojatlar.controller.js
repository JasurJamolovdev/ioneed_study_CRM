const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");
const MurojatPageController = async (req, res) => {
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("murojat", {
    title: "Murojatlar",
    text: "Murojatlar",
    admin: Admin[0],
  });
};

module.exports = {
  MurojatPageController,
};
