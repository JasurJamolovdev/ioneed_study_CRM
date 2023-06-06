const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./src/public"));
app.use(expressFileUpload());

const indexRouter = require("./routers/index.router");
const davomatRouter = require("./routers/davomat.router");
const groupsRouter = require("./routers/groups.router");
const studentsRouter = require("./routers/students.router");
const tolovRouters = require("./routers/tolov.router");
const authRouter = require("./routers/auth.router");
const coursesRouter = require("./routers/courses.router");
const teachersRouter = require("./routers/teachers.router");
const profileRouter = require("./routers/profile.router");

app.use(indexRouter);
app.use(davomatRouter);
app.use(groupsRouter);
app.use(studentsRouter);
app.use(tolovRouters);
app.use(authRouter);
app.use(coursesRouter);
app.use(teachersRouter);
app.use(profileRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
