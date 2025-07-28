import mysql.connector

# connect to local mysql
conn=mysql.connector.connect(
    host='localhost',
    user='root',
    password='230524',
    database='learn'
)

cursor=conn.cursor()

# # create a table
# create_table_query="""
# create table if not exists employees(
# id int auto_increment primary key,
# name varchar(100),
# department varchar(100),
# salary float);"""
#
# cursor.execute(create_table_query)
# print(" Table 'employees' created successfully")

# # insert sample data
# insert_query = """
# insert into employees (name,department,salary)
# values('Rahul Sharma','Engineering',75000),
# ('Priya Verma','Marketing',60000),
# ('Anil Kapoor','HR',50000);"""
#
# cursor.execute(insert_query)
# conn.commit()
# print("Sample data Inserted Successfully.")

# #update
# upd_query="update employees set salary=70000 where id =1;"
# cursor.execute(upd_query)
# conn.commit()
# print("Update successfully")

# # Del query
# del_query="Delete from employees where id =3;"
# cursor.execute(del_query)
# conn.commit()
# print("Deleted employee successfully where id is 3")

cursor.execute("Select * from employees;")
row=cursor.fetchall()
print(row)

# close connection
cursor.close()
conn.close()