--CRM
--Attendence
--Admins
--Groups 
--Strudents
--Courses
--Deleted_students
--Teachers
--Payments
INSERT INTO
    Students(
        student_name,
        student_surname,
        student_phone_num,
        student_img,
        parents_name,
        parents_phone_num,
        direction,
        group_id,
        created_by_admin
    )
VALUES
    ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6, $ 7, $ 8, $ 9);

INSERT INTO
    Teachers(
        teacher_name,
        teacher_surname,
        teacher_phone_num,
        teacher_img,
        teacher_direction,
        created_by_admin
    )
VALUES
    (
        'Jasur',
        'Jamolov',
        '+998937651229',
        'https://img',
        'Kimyo',
        '85a80615-0c47-4386-bcb6-ac1c733b6296'
    );

DELETE FROM
    Teachers
where
    id = '182bcf42-7f8a-494b-ae24-d32e49aa0706';

ALTER TABLE
    Students
ALTER COLUMN
    direction TYPE VARCHAR,
ALTER COLUMN
    direction
SET
    NOT NULL;

ALTER TABLE
    attendence
ADD
    CONSTRAINT unique_insertion_date UNIQUE (date_trunc('day', date));

CREATE TRIGGER set_insertion_date_trigger BEFORE
INSERT
    ON attendence FOR EACH ROW EXECUTE FUNCTION set_insertion_date();

    -- //////////////////////////////////////////////////1


    CREATE FUNCTION get_current_date() RETURNS timestamp IMMUTABLE AS $$
    BEGIN
    RETURN CURRENT_DATE;
    END;
    $$ LANGUAGE plpgsql;

    -- /////////////////2
    CREATE UNIQUE INDEX unique_attendance_today_per_student ON attendence (student_id)
    WHERE
        dateA = get_current_date();

        CREATE UNIQUE INDEX unique_attendance_today_per_student
        ON attendence (student_id)
        WHERE dateA = get_current_date();


ALTER TABLE Groups
ALTER COLUMN teacher_id SET NULL;


ALTER TABLE payments
ADD COLUMN course_id VARCHAR NOT NULL;
