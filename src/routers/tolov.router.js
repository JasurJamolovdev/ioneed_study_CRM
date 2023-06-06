const express = require("express");
const router = express.Router();
const {
  TolovPageController,
  paymentDeleteController,
  paymentPostController,
  paymentUpdateController,
} = require("../controllers/tolov.controller");
const { isAuth } = require("../middlewares/isAuth");

router.get("/tolovlar", isAuth, TolovPageController);
router.post("/postPayment", paymentPostController);
router.post("/updatePayment", paymentUpdateController);
router.post("/deletePayment", paymentDeleteController);

module.exports = router;
