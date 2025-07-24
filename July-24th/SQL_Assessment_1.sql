-- SQL Assignment – Personal Fitness Tracker
create database Fitness_Tracker;
use Fitness_Tracker;

-- Table 1: Exercises
create table if not exists Exercises(
exercise_id int primary key,
exercise_name varchar(100),
category varchar(100),
calories_burn_per_min int
);

-- Table 2: WorkoutLog
create table if not exists workoutLog(
log_id int primary key,
exercise_id int,
date date,
duration_min int,
mood varchar(100),
foreign key (exercise_id) references Exercises(exercise_id)
on update cascade
on delete cascade
);

-- Insert Sample Data
-- Insert at least 5 different exercises.
insert into Exercises values
(1,'Running','Cardio',10),
(2,'Cycling','Cardio',8),
(3,'Weight Lifting','Strength',6),
(4,'Yoga','Flexibility',4),
(5,'Push Ups','Strength',7),
(6, 'Jump Rope', 'Cardio', 12);

-- Log at least 2 workouts per exercise across different days.
insert into WorkoutLog values
(201,2,'2025-03-10',30,'Normal'),         
(202,1,'2025-03-10',40,'Energized'),      
(203,3,'2025-02-20',35,'Tired'),          
(204,1,'2025-03-25',25,'Tired'),          
(205,5,'2025-03-12',25,'Tired'),          
(206,3,'2025-03-20',20,'Normal'),         
(207,1,'2025-04-01',45,'Energized'),      
(208,4,'2025-03-05',60,'Energized'),      
(209,3,'2025-03-25',15,'Normal'),         
(210,2,'2024-02-15',50,'Normal'),         
(211,1,'2025-03-30',20,'Normal'),         
(212,4,'2025-03-18',40,'Energized'),      
(213,5,'2025-03-22',35,'Normal');         

-- Basic Queries
-- 1. Show all exercises under the “Cardio” category.
select * from Exercises
where category ='Cardio';

-- 2. Show workouts done in the month of March 2025.
select * from workoutLog
where month(date)=3 and year(date)=2025;

-- Calculations
-- 3. Calculate total calories burned per workout (duration × calories_burn_per_min).
select w.log_id,e.exercise_name,w.date,w.duration_min,e.calories_burn_per_min,
(w.duration_min*e.calories_burn_per_min) as Total_calories_burned
from Exercises e
join workoutLog w
on e.exercise_id=w.exercise_id;

-- 4. Calculate average workout duration per category.
select e.category,avg(w.duration_min) as Avg_Workout_duration
from Exercises e
left join workoutLog w
on e.exercise_id=w.exercise_id
group by e.category;

-- JOIN + Aggregation
-- 5. List exercise name, date, duration, and calories burned using a join.
select e.exercise_name,w.date,w.duration_min,(w.duration_min*e.calories_burn_per_min) as Total_calories_burned
from Exercises e
join workoutLog w
on e.exercise_id=w.exercise_id;

-- 6. Show total calories burned per day.
select w.date,sum((w.duration_min*e.calories_burn_per_min)) as Total_calories_burned
from Exercises e
join workoutLog w
on e.exercise_id=w.exercise_id
group by w.date;

-- Subqueries
-- 7. Find the exercise that burned the most calories in total.
select * from
(select e.exercise_name,(w.duration_min*e.calories_burn_per_min) as Total_calories_burned
from Exercises e
join workoutLog w
on e.exercise_id=w.exercise_id) as workout
order by Total_calories_burned desc
limit 1;

-- 8. List exercises never logged in the workout log.
select exercise_name from Exercises
where exercise_id not in 
(select exercise_id from workoutLog);

-- Conditional + Text Filters
-- 9. Show workouts where mood was “Tired” and duration > 30 mins.
select * from workoutLog 
where duration_min >30 
and mood='Tired';

-- 10. Update a workout log to correct a wrongly entered mood.
-- updating the log_id 109 
update workoutLog set mood='Tired' where log_id=109;

-- Update & Delete
-- 11. Update the calories per minute for “Running”.
-- the safe update mode is set to off so then the delete or update can be done else it will cause error code 1175
set sql_safe_updates=0;
update Exercises set calories_burn_per_min=15 where exercise_name='Running';

-- 12. Delete all logs from February 2024.
delete from workoutLog where month(date)=2 and year(date)=2024;

-- after delete again enable the safe mode on
set sql_safe_updates=1;
