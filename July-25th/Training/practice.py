# # Ask user to enter the name
# name=input("What's your name?")
#
# print('Hello',name,'!')
# # format string
# print(f"Hello {name} !")


# String operations
# declare a string
# greetings = "Hello, Hexa"
#
# # Accessing the char
# print(greetings[0])
# print(greetings[-1])
#
# # slicing
# print(greetings[0:5])
# print(greetings[7:])
# print(greetings[::-1])
# print(greetings[7:-1:-1])
#
# # string methods
# print(greetings.upper())
# print(greetings.lower())
# print(greetings.replace('hexa','saravanan'))
# print(greetings.capitalize())
# print(greetings.swapcase())

# # list
# lis=['Apple','mango','Banana','cherry']
#
# # Accessing it
# print(lis[1])
# print(lis[-1])
#
# # Adding teh element to the lid
# lis.append(5)
#
# # extend
# lis1=[1,2,3]
# lis.extend(lis1)
# print(lis)
#
# # removing the ele
# lis.remove(2)
# print(lis)
# lis.pop()
# print(lis)
# lis.pop(0)
# print(lis)
#
# # Slicing
# print(lis[1:])
# print(lis[::-1])
# print(lis[::2])
#
# # looping the list item
# for i in lis:
#     print(i)
#
# # changing the values in the lis
# lis[1]='Apple'
# print(lis)


# # tuples
# # creating tuple
# tup=('Apple','Orange','Cherry')
#
# # access
# print(tup[1])
#
# # slicing
# print(tup[1:3])
#
# # updating
# tup[1]="Mango"


# # Practice Task
# name="The lion King"
# # print only 'King'
# print(name[9:13])
#
# lis=['Fired rice','Biryani','Tomato Rice']
# # add one more
# lis.append("Curd Rice")
# # remove 2nd item
# lis.pop(1)
# # print final
# print(lis)
#
# # tuple of three num
# num=(5,3,6)
# # Access last
# print(num[-1])

# # if else
# age= int(input("What's the age?"))
# if age >=18:
#     print("You can Vote")
# else:
#     print("You can't you are too young")
#
# # if elif
# mark=int(input("What's your mark?"))
#
# if mark>=90:
#     print("Grade A")
# elif mark>=75:
#     print("Grade B")
# elif mark>=50:
#     print("Grade C")
# else:
#     print("Grade F")

# # while loop
# count=1
# while count<=5:
#     print("Count is:",count)
#     count+=1

# # for loop
# for i in range(5):
#     print("Number",i)
#
# for i in range(1,6):
#     print(i)

# # continue , break
# for i in range(1,10):
#     if i==5:
#         continue
#     if i==0:
#         break
#     print(i)


# # function
# def greet():
#     print("Hello from Hexaware")
#
# greet()

# def greet_user(name):
#     print(f"Hello, {name}! Welcome.")
#
# greet_user("Harish")
#
# def add(a,b):
#     return a+b
# result=add(20,100)
# print(f"Sum is: {result}")
#
# def power(b,e=2):
#     return b**e
# print(power(5))
# print(power(5,3))


# # Inbuild Function
# name="Harish"
# print(len(name))
#
# print(type(5))
# print(type("Hello"))
#
# age="23"
# print(int(age)+5)
#
# nums=[5,8,6,4,3,1]
# print(sum(nums))
# print(max(nums))
# print(min(nums))
#
# names=["Hari","Abs","Arivu","Saran","Vishal"]
# print(sorted(names))
#
# print(abs(-10))
#
# print(round(3.75))
# print(round(3.7567,2))

# Modules are the collections of the multiple function
# import math
#
# print(math.sqrt(16))
# print(math.pow(2,3))
# print(math.pi)
#
# import datetime as d
#
# today=d.date.today()
# print("Today date is:",today)

# now=d.datetime.now()
# print("Current time is:",now.strftime("%H:%H:%S"))