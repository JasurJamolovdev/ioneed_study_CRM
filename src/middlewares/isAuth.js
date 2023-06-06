const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const { token } = req.cookies;
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const userid = userId.id;
    if (userid) {
      next();
    } else {
      res.status(401).redirect("/signIn");
    }
  } catch (error) {
    res.status(401).redirect("/signIn");
  }
}

module.exports = {
  isAuth,
};
