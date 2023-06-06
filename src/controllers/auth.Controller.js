const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAdmins, insertAdmins } = require("../models/auth.queries");
const { cloudinaryUpload } = require("../utils/cloudinary");
// GET CONTROLLERS
const signUpPageController = (req, res) => {
  res.render("signUp", { title: "SignUp" });
};
const signInPageController = (req, res) => {
  res.render("signIn", { title: "signIn" });
};

// POST CONTROLLERS
const SignUpPostController = async (req, res) => {
  try {
    const { user_img } = req.files;
    const { user_name, user_email, user_password } = req.body;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/auth",
      user_img.name
    );
    user_img.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const profileImgPath = uploadedImg.secure_url;
    // PASSWORD HASHING
    const hashedPsw = await bcrypt.hash(user_password, 12);
    // INSERTING DATA TO DATABASE
    await insertAdmins(user_name, user_email, hashedPsw, profileImgPath);
    res.redirect("/signIn");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const SignInPostController = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const Admins = await getAdmins();
    const foundAdmin = Admins.find((c) => c.email === admin_email);
    if (!foundAdmin) {
      console.log("Email wrong!");
      res.end("Email wrong!");
    } else {
      const comparedPsw = await bcrypt.compare(
        admin_password,
        foundAdmin.password
      );
      if (comparedPsw) {
        const token = jwt.sign({ id: foundAdmin.id }, process.env.JWT_SECRET);
        res.cookie("token", token, { maxAge: 18000000 * 4 });
        res.status(200).redirect("/");
      } else {
        console.log("Password wrong!");
        res.end("Password wrong!");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signInPageController,
  SignInPostController,
  signUpPageController,
  SignUpPostController,
};
