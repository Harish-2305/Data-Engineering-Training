import pandas as pd
import numpy as np
import json


# Part 1 Basics
# 1. Write a function Q1. Write a function is_prime(n) that returns True  if n is a prime number, else  False.
def is_prime(n):
    for i in range(2,int((n**0.5)+1)):
        if n%i==0:
            return False
    return True

num=int(input("Enter the number to check whether its prime or not:"))
print(f"{num} is Prime" if is_prime(num) else f"{num} is not prime")


# 2. Write a program That Accept a String, Reverses it, Checks if its a Palindrome
val=input("Enter the String:")
val_rev=val[::-1]
print("Its palindrome" if val == val_rev else "It's not Palindrome")


# 3. Given a list of numbers -- Remove duplicates, Sort them, Print 2nd Largest
lis=list(map(int,input("Enter the number (eg:1 2 3 . .) :").split()))
up_lis=sorted(list(set(lis)))
print(f" The Second largest number is {up_lis[-2]}")


# Part 2: Classes and Inheritance
# 4. Create a base class person with attributes name,age, method display
class Person:
    def __init__(self,name,age):
        self.name=name
        self.age=age

    def display(self):
        print(f"Name:{self.name} \nAge:{self.age}")


class Employee(Person):
    def __init__(self,name,age,employee_id,department):
        super().__init__(name,age)
        self.employee_id=employee_id
        self.department=department

    def display(self):
        super().display()
        print(f"Employee_id:{self.employee_id}\nDepartment:{self.department}")

emp=Employee("Harish",21,23,"Data_Engineering")
emp.display()


# 5.Method Overriding (Vehicle → Car)
class Vehicle:
    def drive(self):
        print("Driving the Vehicle")

class Car(Vehicle):
    def drive(self):
        print("The car is Amazing !")

check1=Vehicle()
check1.drive()

check2=Car()
check2.drive()


# Part 3 : CSV and JSON Handling
# 6 Read The students.csv - Fill missing age with avg age, score with 0- Save cleaned as students_cleaned.csv

df=pd.read_csv('students.csv')

# Filling AGE = AVG
df['Age']=df['Age'].fillna(df['Age'].mean())

# Filling missing score = 0
df['Score']=df['Score'].fillna(0)

# Save the cleaned data
df.to_csv('students_cleaned.csv',index=False)

# 7. Save to JSON
df.to_json('students.json')


# Part 4 Data cleaning and Transformation

# 8. using numpy and pandas
df=pd.read_csv('students_cleaned.csv')

def status_Check(row):
    if row['Score']>=85:
        return 'Distinction'
    elif 85 > row['Score'] and 60 <= row['Score']:
        return 'Passed'
    else:
        return 'Failed'

df['Status']=df.apply(status_Check,axis=1)

df['Tax_ID']='tax'+df['ID'].astype(str)

print(df)
df.to_csv('students_Cleaned.csv',index=False)


# part 5: Json Manipulation With Python

df=pd.read_json('products.json')

df['price']=df['price']*1.10

df.to_json('products_updated.json',indent=2)


