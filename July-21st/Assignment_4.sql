-- creating the database assign4 for the assignment 4.
create database assign4;
use assign4;

-- SECTION 1: Database Design
-- create table movies
create table if not exists movies (
    movie_id int primary key,
    title varchar(100) not null,
    genre varchar(100),
    release_year INT not null,
    rental_rate DECIMAL(6,2) not null
);

-- create table customers
create table if not exists customers (
    customer_id int primary key,
    name varchar(100) not null,
    email varchar(100) unique,
    city varchar(50)
);

-- create table rentals
create table if not exists rentals (
    rental_id int primary key,
    customer_id int,
    movie_id int,
    rental_date date,
    return_date date,
    foreign key(customer_id) references customers(customer_id),
    foreign key (movie_id) references movies(movie_id)
    on update cascade
    on delete cascade
);


-- SECTION 2: Data Insertion

insert into movies values
(1,'Vikram','Action',2022,120.00),
(2,'Mass','Action',2021,100.00),
(3,'96','Romance',2018,90.00),
(4,'Soorarai Pottru','Drama',2020,110.00),
(5,'Doctor','Comedy',2021,95.00);

insert into customers values
(101,'Amit Sharma','amit@gmail.com','Chennai'),
(102,'Neha Reddy','neha@gmail.com','Bangalore'),
(103,'Harish Saravanan','hari@gmail.com','Bangalore'),
(104,'Divya Mehta','divya@gmail.com','Coimbatore'),
(105,'Ravi Verma','ravi@gmail.com','Madurai');  

insert into rentals values
(201,102,1,'2024-06-01','2024-06-02'),  
(202,101,2,'2024-06-10','2024-06-11'),  
(203,102,3,'2024-06-15','2024-06-17'),
(204,103,2,'2024-06-16','2024-06-17'),  
(205,103,4,'2024-06-18',null),          
(206,104,5,'2024-06-19','2024-06-20'),
(207,102,5,'2024-06-20',null),
(208,104,2,'2024-06-22','2024-06-23');  

-- SECTION 3: Query Execution
-- Execute the following queries:

-- Basic Queries
-- 1. Retrieve all movies rented by a customer named 'Amit Sharma'.
select m.title 
from rentals r
join movies m on r.movie_id=m.movie_id
join customers c on r.customer_id=c.customer_id
where c.name='Amit Sharma' ;

-- 2. Show the details of customers from 'Bangalore'.
select * from customers
where city='Bangalore';

-- 3. List all movies released after the year 2020.
select * from movies
where release_year > 2020;

-- Aggregate Queries
-- 4. Count how many movies each customer has rented.
select c.customer_id,c.name,count(r.rental_id) as Movie_count
from customers c
left join rentals r
on c.customer_id=r.customer_id
group by c.customer_id,c.name;

-- 5. Find the most rented movie title.
select m.title, count(rental_id) as Rented_Count
from movies m
join rentals r
on m.movie_id = r.movie_id
group by m.title
order by count(rental_id) desc
limit 1;

-- 6. Calculate total revenue earned from all rentals.
select sum(rental_rate) as Total_Rent
from movies m
join rentals r
on m.movie_id=r.movie_id;

-- Advanced Queries
-- 7. List all customers who have never rented a movie.
select c.customer_id,c.name
from customers c
left join rentals r
on c.customer_id=r.customer_id
where rental_id is null;

-- 8. Show each genre and the total revenue from that genre.
select m.genre, SUM(m.rental_rate) as total_revenue
from rentals r
join movies m on r.movie_id = m.movie_id
group by m.genre;

-- 9. Find the customer who spent the most money on rentals.
select c.name, sum(m.rental_rate) as Total_Spent
from rentals r
join customers c on r.customer_id = c.customer_id
join movies m on r.movie_id = m.movie_id
group by c.customer_id, c.name
order by total_spent desc
limit 1;

-- 10. Display movie titles that were rented and not yet returned ( return_date IS NULL ).
select m.title 
from movies m
join rentals r
on m.movie_id=r.movie_id
where return_date is null;





