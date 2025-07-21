-- creating the database assign3 for the assignment 3.
create database assign3;
use assign3;

-- PART 1: Design the Database
-- Create the following three tables with appropriate datatypes and constraints:

-- create table books
create table if not exists books(
book_id int primary key,
title varchar(100),
author varchar(100),
genere varchar(50),
price decimal (10,2));

-- create table customers
create table if not exists customers (
customer_id int primary key,
name varchar(100),
email varchar(100),
city varchar(100));

-- create table orders
create table if not exists orders(
order_id int primary key,
customer_id int,
book_id int,
order_date date,
quantity int,
foreign key (customer_id) references customers(customer_id),
foreign key (book_id) references books(book_id)
on delete cascade
on update cascade
);

-- PART 2: Insert Sample Data
-- Insert at least:
-- 5 books (with varied genres and prices)
-- 5 customers (from different cities)
-- 7 orders (mix of books, customers, and dates)

insert into books values
(1,'Atomic Habits','James Clear','Self-help',499.00),
(2,'The god of small thing','Roy','Fiction',299.00),
(3,'Do hard things','Steve','Self-help',599.00),
(4,'Code area','Martin','Programming',729.00),
(5,'Clean Code','Robert','Programming',699.00),
(6,'The psychology of Money','Morgan','Finance',399.00),
(7,'The power of mind','Joseph','Philosophy',549.00);

insert into customers values
(101,'Amit Sharma','amit@gmail.com','Coimbatore'),
(102,'Neha Reddy','neha@yahoo.com','Hyderabad'),
(103,'Divya Mehta','divya@gmail.com','Chennai'),
(104,'Ravi Verma','ravi@gmail.com','Mumbai'),
(105,'Pooja Singh','pooja@gmail.com','Bangalore');

insert into orders values
(201,104,1,'2024-01-15',2),
(202,101,5,'2024-02-01',1),
(203,105,6,'2024-02-05',3),
(204,103,4,'2024-03-10',2),
(205,101,6,'2024-03-12',1),
(206,102,7,'2024-04-01',1),
(207,104,7,'2024-04-20',1),
(208,101,1,'2024-05-01',1),
(209,105,5,'2024-05-10',2),
(210,103,1,'2024-06-01',1);

-- PART 3: Write and Execute Queries
-- Basic Queries

-- 1. List all books with price above 500
select * from books
where price > 500;

-- 2. Show all customers from the city of ‘Hyderabad’.
select * from customers
where city='Hyderabad';

-- 3. Find all orders placed after ‘2023-01-01’.
select * from orders
where order_date > "2023-01-01";


-- Joins & Aggregations
-- 4. Show customer names along with book titles they purchased.
select c.name as Name,b.title as Book_Title
from orders o
join customers c on o.customer_id=c.customer_id
join books b on o.book_id=b.book_id ;

-- 5. List each genre and total number of books sold in that genre.
select b.genere,sum(o.quantity) as NO_OF_Book
from books b
left join orders o
on b.book_id=o.book_id
group by b.genere
order by sum(o.quantity) desc;

-- 6. Find the total sales amount (price × quantity) for each book.
select b.book_id,b.title,sum(b.price*o.quantity) as Total_Sales_Amount
from books b
left join orders o
on b.book_id=o.book_id
group by b.book_id,b.title
order by sum(b.price*o.quantity) desc;

-- 7. Show the customer who placed the highest number of orders.
select c.name,sum(o.quantity) as NO_OF_ORDERS
from customers c
join orders o
on c.customer_id=o.customer_id
group by c.customer_id
order by sum(quantity) desc
limit 1;

-- 8. Display average price of books by genre.
select genere,avg(price) as AVG_Price
from books
group by genere
order by avg(price) desc;

-- 9. List all books that have not been ordered.
select b.book_id,b.title
from books b
left join orders o
on b.book_id=o.book_id
where o.order_id is null;

-- 10. Show the name of the customer who has spent the most in total.
select c.customer_id,c.name,sum(b.price*o.quantity) as Toatl_Amount
from orders o
join customers c on o.customer_id=c.customer_id
join books b on o.book_id=b.book_id
group by c.customer_id,c.name
order by sum(b.price*o.quantity) desc
limit 1;

