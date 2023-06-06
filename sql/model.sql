DROP DATABASE IF EXISTS CRM;
CREATE DATABASE CRM;

--TABLE ADMIN--
DROP TABLE IF EXISTS Admins;
CREATE TABLE Admins(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profileImg VARCHAR NOT NULL,
    registrated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

--TABLE Courses--

CREATE TABLE Courses(
    id VARCHAR NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_title VARCHAR(32) NOT NULL,
    created_at DATE NOT NULL  DEFAULT CURRENT_DATE,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_admin FOREIGN KEY (created_by_admin) REFERENCES Admins(id)
);

--TABLE Teachers--

CREATE TABLE Teachers(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(), 
    teacher_name VARCHAR(32) NOT NULL,
    teacher_surname VARCHAR(32) NOT NULL,
    teacher_phone_num VARCHAR(32) NOT NULL,
    teacher_img VARCHAR NOT NULL,
    teacher_direction VARCHAR NOT NULL,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_admin FOREIGN KEY (created_by_admin) REFERENCES Admins(id)
);

--TABLE GROUP--

CREATE TABLE  Groups(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_title VARCHAR(64) NOT NULL,
    day_lesson VARCHAR(32) NOT NULL,
    time_lesson VARCHAR(32) NOT NULL,
    teacher_id VARCHAR NOT NULL,
    course_id VARCHAR NOT NULL,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_courses FOREIGN KEY(course_id) REFERENCES Courses(id),
    CONSTRAINT fk_teachers FOREIGN KEY(teacher_id) REFERENCES Teachers(id),
    CONSTRAINT fk_admins FOREIGN KEY(created_by_admin) REFERENCES Admins(id)
);

--TABLE Students--

CREATE TABLE Students(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(32) NOT NULL,
    parents_name VARCHAR(32) NOT NULL,
    direction VARCHAR(32) NOT NULL,
    student_phone_num VARCHAR(32) NOT NULL,
    parents_phone_num VARCHAR(32) NOT NULL,
    student_img VARCHAR NOT NULL,
    student_surname VARCHAR(32) NOT NULL,
    group_id VARCHAR NOT NULL,
    registrated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_groups FOREIGN KEY(group_id) REFERENCES Groups(id),
    CONSTRAINT fk_admin FOREIGN KEY(created_by_admin) REFERENCES Admins(id)
);

ALTER TABLE students 
ADD COLUMN registrated_at DATE;

ALTER TABLE students 
ALTER COLUMN registrated_at SET DEFAULT CURRENT_DATE;

CREATE OR REPLACE FUNCTION deleteStudentsFunc() RETURNS TRIGGER AS $delete_student$
    BEGIN
       INSERT INTO deleted_students(id,student_name,student_phone_num) VALUES (old.id, old.student_name,old.student_phone_num);
       RETURN old;
    END;
 $delete_student$ LANGUAGE plpgsql;
 
DROP TRIGGER delete_student_tg ON students;

CREATE TRIGGER delete_student_tg AFTER
DELETE ON "students"
FOR EACH ROW EXECUTE PROCEDURE deleteStudentsFunc();

--TABLE Deleted_students--

DROP TABLE IF EXISTS Deleted_students;
CREATE TABLE Deleted_students (
id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
student_name VARCHAR(32) NOT NULL,
student_phone_num VARCHAR(32) NOT NULL,
date TIMESTAMP  DEFAULT CURRENT_DATE
);

--TABLE ATTENDENCE--

DROP TABLE IF EXISTS Attendence;
CREATE TABLE Attendence(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR NOT NULL,
    dateA TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attendence BOOLEAN DEFAULT false,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_students FOREIGN KEY (student_id) REFERENCES Students(id),
    CONSTRAINT fk_admin FOREIGN KEY (created_by_admin) REFERENCES Admins(id)
);


--TABLE Payments--

CREATE TABLE Payments(
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(), 
    student_id VARCHAR NOT NULL,
    payment BOOLEAN DEFAULT FALSE,
    datePay DATE DEFAULT CURRENT_DATE,
    course_id VARCHAR NOT NULL,
    checkPic VARCHAR NOT NULL,
    created_by_admin VARCHAR NOT NULL,
    CONSTRAINT fk_admin FOREIGN KEY (created_by_admin) REFERENCES Admins(id),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id)
);
