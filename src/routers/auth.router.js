const express = require("express");
const router = express.Router();
const {
  signInPageController,
  SignInPostController,
  signUpPageController,
  SignUpPostController,
} = require("../controllers/auth.Controller");

router.get("/signUp", signUpPageController);
router.post("/signInPost", SignInPostController);
router.get("/signIn", signInPageController);
router.post("/signUp", SignUpPostController);

module.exports = router;
