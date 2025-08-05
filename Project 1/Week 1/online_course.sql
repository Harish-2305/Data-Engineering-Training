-- create database for the project online course enrollement and progress tracker  
create database online_course;
use online_course;

--  Create MySQL tables: students, courses, enrollments, progress
--  Table Students
create table if  not exists students(
student_id int primary key auto_increment,
name varchar(100),
email varchar(100) unique,
age int,
registration_date timestamp default current_timestamp
);

-- Table courses
create table if not exists courses(
course_id int primary key auto_increment,
course_name varchar(100),
description text,
instructor_name varchar(100),
No_Of_modules int,
duration_weeks int,
created_at timestamp default current_timestamp
);
alter table courses auto_increment=501;

-- Table enrollments
create table if not exists enrollments(
enroll_id int primary key auto_increment,
student_id int,
course_id int,
enroll_date timestamp default current_timestamp,
status enum('Active','Completed','Droped') default 'Active',
foreign key (student_id) references students(student_id),
foreign key (course_id) references courses(course_id)
on delete cascade
on update cascade
);
alter table enrollments auto_increment=1001;

-- Table progress
create table if not exists progress(
progress_id int primary key auto_increment,
enroll_id int,
modules_completed int default 0,
last_update timestamp default current_timestamp on update current_timestamp,
foreign key (enroll_id) references enrollments(enroll_id)
on update cascade
on delete cascade
);
alter table progress auto_increment=2001;

-- insert records into students
insert into students (name,email,age) 
values ('Harish','harish@gmail.com',21),
('saravanan','saran@gmail.com',28),
('Valar','valar@gmail.com',30);

-- insert into courses
insert into courses (course_name,description,instructor_name,No_Of_modules,duration_weeks)
values ('Foundation of python','Basic of python - data types,loops,conditinal','Santhosh',4,2),
('Advanced python','Function,Oops concept- class,methods,constructors,abstraction,encapsulation','Vasanth',6,4);

-- insert into enrollments
insert into enrollments (student_id,course_id)
values(1,501),(2,501),(1,502);

-- insert into progress
insert into progress (enroll_id,modules_completed)
values(1001,2),(1002,1);

-- viewing all the records 
select * from students;
select * from courses;
select * from enrollments;
select * from progress;

-- updates 
update enrollments set status='Completed' where enroll_id=1001;
update progress set modules_completed=4 where enroll_id=1001;

-- Delete
delete from enrollments where enroll_id=1003;

delimiter $$
create procedure GetCompletionPercentage(in input_enroll_id int)
begin
    select 
        s.name as student_name,
        c.course_name,
        p.modules_completed,
        c.No_Of_modules,
        round((p.modules_completed / c.No_Of_modules) * 100, 2) as completion_percentage
    from enrollments e
    join students s on e.student_id = s.student_id
    join courses c on e.course_id = c.course_id
    join progress p on e.enroll_id = p.enroll_id
    WHERE e.enroll_id = input_enroll_id;
end $$
delimiter ;

call GetCompletionPercentage(1001);
call GetCompletionPercentage(1002);



