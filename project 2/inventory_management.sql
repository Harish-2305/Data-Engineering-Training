-- inventory database for inventory management System 
create database inventory;
use inventory;
-- drop database inventory;

 -- Create MySQL tables: products, warehouses, stock_movements, supplier
  -- Table : supplier
create table if not exists supplier(
supplier_id int primary key auto_increment,
name varchar(100) not null,
address text,
email varchar(20),
phone varchar(20),
gst_number varchar(20),
rating int check (rating between 1 and 5)
);


 -- Table : products
 create table if not exists products(
 product_id int primary key auto_increment,
 name varchar(100) not null,
 description text,
 category varchar(100),
 unit_price decimal(10,2),
 reorder_level int not null,
 status enum('active','inactive') default 'active',
 supplier_id int,
 created_at timestamp default current_timestamp,
 last_updated timestamp default current_timestamp on update current_timestamp,
foreign key (supplier_id) references supplier(supplier_id)
on update cascade
on delete set null
 );
 alter table supplier auto_increment=1000;


-- Table : warehouse
create table if not exists warehouse(
warehouse_id int primary key auto_increment,
location varchar(100) not null,
capacity int,
manager_name varchar(100),
contact_number bigint
);

alter table warehouse auto_increment=2000;

-- Table : stock_movements
create table if not exists stock_movements(
movement_id int primary key auto_increment,
product_id int,
warehouse_id int,
quantity int not null,
movement_type enum('IN','OUT') not null,
movement_date timestamp default current_timestamp,
reason_code text,
recorded_by varchar(100),
verified boolean default false,
foreign key (product_id) references products(product_id),
foreign key (warehouse_id) references warehouse(warehouse_id)
on update cascade
on delete cascade
);

alter table stock_movements auto_increment=3000;

-- insert datas into tables
-- insert into suppliers
insert into  supplier (name, address, email, phone, gst_number, rating)
values
('Tech Supplies Pvt Ltd','Chennai','tech@sup.com','9876543210','GSTTN1234X', 5),
('Global Traders','Mumbai','global@gt.com','9988776655','GSTMH5678Y', 4);

-- insert into warehouse
insert into warehouse (location, capacity, manager_name, contact_number)
values
('Chennai',2000,'Vikram Kumar',9876543210),
('Bangalore',1500,'Aishwarya Rao',9988776655);

-- insert into products
-- insert into products
insert into products (name, description, category, unit_price, reorder_level, supplier_id)
values
('Lenovo Laptop','Core i5, 8GB RAM, 512GB SSD','Electronics',56000.00,10,1000),
('Wireless Mouse','Bluetooth Mouse','Accessories',700.00,25,1001);

-- insert into stock_movements
-- IN: Stock received
insert into stock_movements (product_id, warehouse_id, quantity, movement_type, reason_code, recorded_by, verified)
values
(1,2000,30,'IN','New stock purchase','Admin',true),
(2,2000,50,'IN','Vendor delivery','InventoryUser',true);

-- OUT: Stock issued or lost
insert into stock_movements (product_id, warehouse_id, quantity, movement_type, reason_code, recorded_by, verified)
values
(2,2000,5,'OUT','Customer order','SalesUser',true),
(1,2000,2,'OUT','Damaged item','WarehouseUser',true);

-- Read datas 
-- view all products
select * from products;
select * from supplier;

-- suppliers whose rating is equal or greayer than 4
select * from supplier where rating >= 4;

-- View current stock movements
select movement_id, product_id, warehouse_id, movement_type, quantity, movement_date, reason_code
from stock_movements
order by movement_date desc;

-- Update
--  Update product price and category
update products
set unit_price = 58000.00, category = 'Computers'
where product_id = 1;

-- Update supplier contact info
update supplier
set email = 'support@sup.com', phone = '9000012345'
where supplier_id = 2000;

-- Delete
-- Delete a product
DELETE FROM products
WHERE product_id = 3;

--  Delete a supplier
DELETE FROM supplier
WHERE supplier_id = 2001;

-- Write a stored procedure to identify products below reorder level
delimiter $$
create procedure GetProductsBelowReorderLevel()
begin
  select 
    p.product_id,
    p.name as product_name,
    p.reorder_level,
    coalesce(SUM(
      case
        when sm.movement_type = 'IN' then sm.quantity
        when sm.movement_type = 'OUT' then -sm.quantity
        else 0
      end
    ), 0) as current_stock
  from products p
  left join stock_movements sm on p.product_id = sm.product_id
  group by p.product_id, p.name, p.reorder_level
  having current_stock < p.reorder_level;
end $$
delimiter ;

call GetProductsBelowReorderLevel();










