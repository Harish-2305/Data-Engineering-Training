# Python Exercises

# # 1. FizzBuzz Challenge
# # Print numbers from 1 to 50:
# # If divisible by 3, print "Fizz"
# # If divisible by 5, print "Buzz"
# # If divisible by both, print "FizzBuzz"
# # Else, print the number
#
# for i in range(1,51):
#     if i%3==0 and i%5==0:
#         print("FizzBuzz")
#     elif i%3==0:
#         print("Fizz")
#     elif i%5==0:
#         print("Buzz")
#     else:
#         print(i)


# # 2. Login Simulation (Max 3 Attempts)
# # Ask for a username and password. Allow maximum 3 attempts to enter the correct
# # values ( admin / 1234 ). After 3 wrong tries, print "Account Locked"
#
# i=0
# while i<3:
#     name=input("Enter the username:")
#     password=input("Enter the password:")
#     if name=="admin" and password=="1234":
#         print("Successfully logged in")
#         break
#     else:
#         print("Invalid! Try Again!")
#     i+=1
# if i==3:
#     print("Account Locked")


# # 3. Palindrome Checker
# # Ask the user to input a word. Print whether the word is a palindrome (reads same forward & backward).
#
# word=input("Enter the word to check:")
# if word==word[::-1]:
#     print("Yeh! it's Palindrome")
# else:
#     print("Oops! It's not Palindrome")


# # 4. Prime Numbers in a Range
# # Ask user for a number n and print all prime numbers from 1 to n .
#
# n=int(input("Enter the Range:"))
# for i in range(2,n+1):
#     num=1
#     for j in range(2,int(i**0.5)+1):
#         if i%j==0:
#             num=0
#             break
#     if num:
#         print(i,end=" ")


# # 5. Star Pyramid
# # Use a for loop to print a triangle of stars:
#
# n=int(input("Enter n:"))
# for i in range(n+1):
#     for j in range(i):
#         print('*',end=" ")
#     print()


# # 6. Sum of Digits
# # Ask the user to input a number like 456 Output should be 4 + 5 + 6 = 15
#
# n=input("Enter the number to sum:")
# num=0
# for i in n:
#     num+=int(i)
# print(f"The sum of {n} is {num}")


# # 7. Multiplication Table Generator
# # Ask user for a number, print its multiplication table up to 10.
#
# n=int(input("Which table need to print?"))
# for i in range(1,11):
#     print(f"{n} * {i} = {n*i}")


# # 8. Count Vowels in a String
# # Ask user to enter a sentence. Print total number of vowels (a, e, i, o, u) present.
#
# sen=input("Enter the sentence:").lower()
# vowel_count=sen.count('a')+sen.count('e')+sen.count('i')+sen.count('o')+sen.count('u')
# print(f"The no of vowels: {vowel_count}")