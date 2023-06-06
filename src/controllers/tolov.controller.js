const { Students } = require("../models/students.queries");
const jwt = require("jsonwebtoken");
const { getOneAdmin } = require("../models/auth.queries");
const { getCourses } = require("../models/courses.queries");
const { cloudinaryUpload } = require("../utils/cloudinary");
const path = require("path");
const {
  deletePayment,
  getPayments,
  postPayment,
  updatePayment,
} = require("../models/payment.model");

const TolovPageController = async (req, res) => {
  const paymentsList = await getPayments();
  const students = await Students();
  const courses = await getCourses();
  const { token } = req.cookies;
  const tokenV = jwt.verify(token, process.env.JWT_SECRET).id;
  const Admin = await getOneAdmin(tokenV);
  res.render("tolov", {
    title: "To'lovlar",
    text: "To'lovlar",
    studentsList: students,
    payments: paymentsList,
    admin: Admin[0],
    course: courses,
  });
};

const paymentPostController = async (req, res) => {
  try {
    const { student_id, payment, datePay, course_id } = req.body;
    const { checkPic } = req.files;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/checkImgs/",
      checkPic.name
    );
    checkPic.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    const paymentsList = await getPayments();
    const foundPayment = paymentsList.find((p) => p.student_id === student_id);
    if (foundPayment) {
      console.log(
        "Bu o'quvchi allaqachon to'lovlar jadvalida mavjud!!! Ushbu o'quvchi qatoriga o'tib, uning to'lov holatini o'zgartirib qo'yishingiz mumkin. Agarda to'lov muddati o'tgan bo'lsa!"
      );
      res
        .status(401)
        .json({
          msg: "Bu o'quvchi allaqachon to'lovlar jadvalida mavjud!!! Ushbu o'quvchi qatoriga o'tib, uning to'lov holatini o'zgartirib qo'yishingiz mumkin. Agarda to'lov muddati o'tgan bo'lsa!",
        });
    } else {
      await postPayment(
        student_id,
        payment ? payment : false,
        datePay,
        uploadedImg.secure_url,
        admin_id,
        course_id
      );
      res.status(200).redirect("/tolovlar");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const paymentUpdateController = async (req, res) => {
  try {
    const { id, payment, datePay } = req.body;
    const { checkPic } = req.files;
    const img_url = path.join(
      process.cwd(),
      "./src/upload/students/",
      checkPic.name
    );
    checkPic.mv(img_url);
    const uploadedImg = await cloudinaryUpload(img_url);
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    const paymentsList = await getPayments();
    const foundPayment = paymentsList.find((p) => p.id === id);
    if (!foundPayment) {
      console.log("Payment not found!");
      res.status(404).json({ msg: "Payment not found!" });
    } else {
      payment ? payment : foundPayment.payment;
      datePay ? datePay : foundPayment.datePay;
      uploadedImg.secure_url ? uploadedImg.secure_url : foundPayment.checkPic;
      admin_id ? admin_id : foundPayment.created_by_admin;

      await updatePayment(
        id,
        payment,
        datePay,
        uploadedImg.secure_url,
        admin_id
      );
      res.status(200).redirect("/tolovlar");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const paymentDeleteController = async (req, res) => {
  try {
    const { payment_id } = req.body;
    const { token } = req.cookies;
    const admin_id = jwt.verify(token, process.env.JWT_SECRET).id;
    const paymentsList = await getPayments();
    const foundPayment = paymentsList.find((p) => p.id === payment_id);
    if (!foundPayment) {
      console.log("Payment not found!");
      res.status(404).json({ msg: "Payment not found!" });
    } else {
      await deletePayment(payment_id, admin_id);
      res.status(200).redirect("/tolovlar");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  TolovPageController,
  paymentPostController,
  paymentUpdateController,
  paymentDeleteController,
};
