-- SQL Assignment – Travel Planner
create database Travel_planner;
use Travel_planner;

-- create Table 1: Destinations
create table if not exists Destinations(
destination_id int primary key,
city varchar(100),
country varchar(100),
category varchar(100),
avg_cost_per_day decimal(10,2));

-- create Table 2: Trips
create table if not exists Trips(
trip_id int primary key,
destination_id int,
traveler_name varchar(100),
start_date date,
end_date date,
budget decimal(10,2),
foreign key (destination_id) references Destinations(destination_id)
on update cascade
on delete cascade
);

-- Insert Sample Data
-- Add at least 6 destinations across 4 different countries.
insert into Destinations values
(1,'Goa','India','Beach',2500),
(2,'Tamil Nadu','India','Historical',2000),
(3,'Paris','France','Adventure',4800),
(4,'Zurich','Switzerland','Nature',5200),
(5,'Cape Town','South Africa','Adventure',3000),
(6,'Kyoto','Japan','Cultural',4500);

-- Add 10+ trips with varying dates, travelers, and budgets.
insert  into Trips values
(101,1,'Amit','2023-03-01','2023-03-05',15000),   
(102,2,'Vishal','2023-06-10','2023-06-20',25000),   
(103,3,'John','2023-04-15','2023-04-18',20000),   
(104,4,'Priya','2023-07-01','2023-07-10',50000),  
(105,5,'Rakesh','2022-12-10','2022-12-25',60000), 
(106,2,'Riya','2023-11-01','2023-11-04',10000),   
(107,1,'Amit','2023-08-10','2023-08-12',7000),    
(108,3,'Riya','2023-09-15','2023-09-22',32000),   
(109,4,'Vishal','2023-05-01','2023-05-05',25000),  
(110,1,'Amit','2022-11-01','2022-11-10',22000); 

-- Query Tasks
-- Basic Queries
-- 1. Show all trips to destinations in “India”.
select * from Destinations
where country='India';

-- 2. List all destinations with an average cost below 3000.
select * from Destinations
where avg_cost_per_day < 3000;

-- Date & Duration
-- 3. Calculate the number of days for each trip.
select trip_id,datediff(end_date,start_date)+1 as NO_OF_Days
from Trips;

-- 4. List all trips that last more than 7 days.
select trip_id,datediff(end_date,start_date)+1 as NO_OF_Days
from Trips
where datediff(end_date,start_date)+1>7;

-- JOIN + Aggregation
-- 5. List traveler name, destination city, and total trip cost (duration × avg_cost_per_day).
select T.traveler_name,D.city, (datediff(T.end_date,T.start_date)+1)*D.avg_cost_per_day as Trip_Cost
from Trips T
join Destinations D
on T.destination_id=D.destination_id
order by (datediff(T.end_date,T.start_date)+1)*D.avg_cost_per_day desc;

-- 6. Find the total number of trips per country.
select D.country , count(T.trip_id) as No_Of_Trips
from Destinations D
left join Trips T
on D.destination_id=T.destination_id
group by D.country;

-- Grouping & Filtering
-- 7. Show average budget per country.
select D.country,avg(T.budget) as AVG_Budget
from Destinations D
join Trips T
where T.destination_id=D.destination_id
group by D.country;

-- 8. Find which traveler has taken the most trips.
select traveler_name,count(trip_id) as Trip_Count
from Trips 
group by traveler_name
order by count(trip_id) desc
limit 1;

-- Subqueries
-- 9. Show destinations that haven’t been visited yet.
select * from Destinations
where destination_id not in 
(select destination_id from Trips);

-- 10. Find the trip with the highest cost per day.
select * from (
select T.trip_id,T.traveler_name,D.city,D.country,T.budget,
datediff(T.end_date,T.start_date)+1 as Duration,
round(T.budget/(datediff(T.end_date,T.start_date)+1),2) as Avg_cost
from Destinations D
join Trips T
on T.destination_id=D.destination_id) as trip
order by Avg_cost desc
limit 1;

-- Update & Delete
-- 11. Update the budget for a trip that was extended by 3 days.
-- Extending the days for the trip_id 101
update Trips set budget =
budget+(3*(
select avg_cost_per_day
from Destinations 
where Trips.destination_id=Destinations.destination_id))
where trip_id=101;

-- 12. Delete all trips that were completed before Jan 1, 2023.
-- the safe update mode is set to off so then the delete can be done else it will cause error code 1175
set sql_safe_updates= 0;

delete from Trips where end_date<'2023-01-01';

-- after delete again enable the safe mode on
set sql_safe_updates=1