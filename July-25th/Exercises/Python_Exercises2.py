# # 1. BMI Calculator (Input + Function + Conditions + math )
# def BMI_cal(w,h):
#     bmi=w/(h*h)
#     if bmi<18.5:
#         return "Under Weight"
#     elif bmi > 25:
#         return "Over Weight"
#     return "Normal"
#
# weight=float(input("What's the weight(KG)?"))
# height=float(input("What's the height(m)?:"))
# print(BMI_cal(weight,height))


# 2. Strong Password Checker (Strings + Conditions + Loop)
# import re
# while True:
#     password=input("Enter the password:")
#     if (re.search(r'[A-Z]',password) and
#         re.search(r'[0-9]',password) and
#         re.search(r'[!@#$]',password)):
#         print("Password is Strong")
#         break
#     print("Weak Password, Try again!")


# # 3. Weekly Expense Calculator (List + Loop + Built-in Functions)
# def Total_spent(lis):
#     return sum(lis)
#
# def avg_per_day(lis):
#     return sum(lis)/len(lis)
#
# def high_spend(lis):
#     return max(lis)
#
# exp=list(map(int,input("Enter the expenses:").split()))
# print("Total Spent",Total_spent(exp))
# print("Average_per_day",avg_per_day(exp))
# print("Highest_Spent",high_spend(exp))


# 4. Guess the Number (Loops + random )
import random
guess=random.randint(1,50)
chance=0
# while chance<5:
#     num=int(input("What's your Guess (1-50)?"))
#     if num<guess:
#         print("Your Guess is too low")
#     elif num>guess:
#         print("Your Guess is too high")
#     else:
#         print("Your Guess is correct")
#         break


# # 5. Student Report Card (Functions + Input + If/Else + datetime )
# import datetime
#
# def grade(a,b,c):
#     total=a+b+c
#     avg=total/3
#     if avg>90:
#         return "Grade A"
#     elif avg>75:
#         return "Grade B"
#     elif avg>50:
#         return "Grade C"
#     else:
#         return "Grade F"
#
# name=input("What's the name?")
# sub1=int(input("What's the mark in subject1 ?"))
# sub2=int(input("What's the mark in subject2 ?"))
# sub3=int(input("What's the mark in subject3 ?"))
#
# print(f"The grade of {name} is {grade(sub1,sub2,sub3)}")
# print("The Date is",datetime.date.today())


# 6. Contact Saver (Loop + Dictionary + File Writing)
contact={}

while True:
    print("""
    === Contact Saver Menu ===
    1. Add Contact
    2. View Contact
    3. Save and Exit
    """)

    ch=input("Enter your choice:")

    if ch=='1':
        name=input("Enter contact name:")
        phone=input("Enter Phone number:")
        contact[name]=phone
        print("Contact added successfully.")

    elif ch =='2':
        if not contact:
            print("No contacts available.")
        else:
            print("The contacts are:")
            for name,phone in contact.items():
                print(f"{name}:{phone}")

    elif ch == '3':
        with open("contact.txt",'w') as file:
            for name,phone in contact.items():
                file.write(f"{name}:{phone}\n")
        print("Contacts Saved to contact.txt")
        print("Exiting....")
        break
    else:
        print("Invalid choice, Enter from the menu")