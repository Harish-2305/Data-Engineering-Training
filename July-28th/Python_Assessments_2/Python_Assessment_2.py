import pandas as pd
import numpy as np
import json

# Part 1 Python Basics
# 1. pytthon function factorial(n) using loop
def factorial(n):
    val=1
    for i in range(1,n+1):
        val*=i
    return val
num=int(input("What's the number ?"))
print(f"The factorial of {num} is {factorial(num)}")


# 2. list of tuples - print only names score > 75 , avg_score
lis=[("Aarav", 80), ("Sanya", 65), ("Meera", 92), ("Rohan", 55)]
avg_score=0
print("The students above 75")
for i in lis:
    if i[1] > 75:
        print(i[0])
    avg_score+=i[1]
print("The average score is ",avg_score/len(lis))


# Part 2 Classes and Inheritance
# 3. Create class Bank Account - Attributes holder_name,balance - methods - exceptions
class BankAccount:
    def __init__(self,holder_name,balance=0):
        self.holder_name=holder_name
        self.balance=balance

    def deposit(self,amount):
        self.balance+=amount
        print(f"Hi {self.holder_name} The amount has deposited Successfully!\nThe current balance {self.balance}\n")

    def withdraw(self,amount):
        if amount>self.balance:
            raise ValueError("Insufficient Balance")
        self.balance-=amount
        print(f"Hi {self.holder_name}The amount is withdrawn Successfully.\nThe current balance {self.balance}\n")

# 4. inherit a savingAccount - Bank Account - attribute interest rate
class SavingsAccount(BankAccount):
    def __init__(self,holder_name,balance=0,interest_rate=0.02):
        super().__init__(holder_name,balance)
        self.interest_rate=interest_rate

    def apply_interest(self):
        interest=self.balance*self.interest_rate
        self.balance+=interest
        print(f"Hi {self.holder_name} The interest Have been added Successfully!\n")

acc1=BankAccount('Harish')
acc1.deposit(1000)
acc1.withdraw(500)

acc2=SavingsAccount('Vishal',2000)
acc2.withdraw(200)
acc2.apply_interest()

acc1.withdraw(1000)


# Part 3 CSV Data Cleaning
# 5. Clean Data and load to Orders_cleaned.csv

df=pd.read_csv('orders.csv')

# filling the missing customer Name
df['CustomerName']=df['CustomerName'].fillna('Unknown')

# Filling the missing item
df['Item']=df['Item'].fillna('Unknown')

# filling the quantity and price 0
df['Quantity']=df['Quantity'].fillna(0)
df['Price']=df['Price'].fillna(0)

# load cleaned to new file
df.to_csv('orders_cleaned.csv',index=0)


# part 4
# 6. Read JSON, Add new fields, new save
df=pd.read_json('inventory.json')

df['status']=np.where(df['stock']>0,'In Stock' ,'Out of Stock')

df.to_json('inventory_updated.json',indent=1)


# Part 5
# 7. Generate an array of 20 random student scores between 35 and 100 using NumPy.

scores=np.random.randint(35,100,size=20)

above_75=np.sum(scores>75)

scr_mean=np.mean(scores)

scr_std=np.std(scores)

print(f"Scores: {scores}\nNo of students Above 75: {above_75}\nMean of scores: {scr_mean}\nStandard deviation: {scr_std}")

df=pd.DataFrame({'Score':scores})

df.to_csv('scores.csv',index=False)
