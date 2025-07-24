// MongoDB Assignment: Library Management System
use Library_Management System

// Step 1: Create Collections and Insert Sample Data
// books
db.books.insertMany([{ book_id: 201, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction",copies: 10 },{ book_id: 202, title: "Atomic Habits", author: "James Clear", genre: "Self-Help",copies: 5 },{ book_id: 203, title: "Sapiens", author: "Yuval Noah Harari", genre: "History",copies: 7 },{ book_id: 204, title: "The Lean Startup", author: "Eric Ries", genre: "Business",copies: 3 },{ book_id: 205, title: "Deep Work", author: "Cal Newport", genre: "Productivity",copies: 4 }])

// members
db.members.insertMany([{ member_id: 101, name: "Ayesha Khan", joined_on: new Date("2024-01-15") },{ member_id: 102, name: "Rahul Verma", joined_on: new Date("2024-03-12") },{ member_id: 103, name: "Nikita Rao", joined_on: new Date("2024-04-10") }])

// borrowed
db.borrowed.insertMany([{ borrow_id: 1, member_id: 101, book_id: 201, date: new Date("2024-06-01"),returned: true },{ borrow_id: 2, member_id: 101, book_id: 203, date: new Date("2024-06-15"),returned: false },{ borrow_id: 3, member_id: 102, book_id: 202, date: new Date("2024-06-20"),returned: false },{ borrow_id: 4, member_id: 103, book_id: 204, date: new Date("2024-06-22"),returned: true }])

// Step 2: Query Exercises
// Basic Queries
// 1. Find all books in the Self-Help genre.
db.books.find({genre:"Self-Help"})

// 2. Show members who joined after March 2024.
db.members.find({joined_on:{$gt:new Date("2024-03-31")}})

// 3. List all borrowed books that have not been returned.
db.borrowed.find({returned:false})

// 4. Display all books with fewer than 5 copies in stock.
db.books.find({copies:{$lt:5}})

// 5. Get details of all books written by Cal Newport.
db.books.find({author:"Cal Newport"})

// Join Queries using $lookup
// 6. List all borrow records with book title and member name.
db.borrowed.aggregate([
  {
    $lookup:{
      from:"books",
      localField:"book_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {
    $lookup:{
      from:"members",
      localField:"member_id",
      foreignField:"member_id",
      as:"member"
    }
  },
  {$unwind:"$member"},
  {
    $project:{
      borrow_id:1,
      book_title:"$book.title",
      member_name:"$member.name",
      date:1,
      returned:1}}])

// 7. Find which member borrowed "Sapiens".
db.borrowed.aggregate([
  {
    $lookup:{
      from:"books",
      localField:"book_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {$match:{"book.title":"Sapiens"}},
  {
    $lookup:{
      from:"members",
      localField:"member_id",
      foreignField:"member_id",
      as:"member"
    }
  },
  {$unwind:"$member"},
  {
    $project:{
      _id:0,
      member_name:"$member.name",
      book_title:"$book.title"}}])

// 8. Display all members along with the books they've borrowed.
db.members.aggregate([
  {
    $lookup:{
      from:"borrowed",
      localField:"member_id",
      foreignField:"member_id",
      as:"borrow"
    }
  },
  {
    $unwind:{
      path:"$borrow",
      preserveNullAndEmptyArrays:true
    }
  },
  {
    $lookup:{
      from:"books",
      localField:"borrow.book_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {
    $unwind:{
      path:"$book",
      preserveNullAndEmptyArrays:true
    }
  },
  {
    $project:{
      member_name:"$name",
      book_title:"$book.title",
      borrowed_on:"$borrow.date",
      returned:"$borrow.returned"}}])

// 9. Get a list of members who have borrowed books and not returned them.
db.borrowed.aggregate([
  {$match:{returned:false}},
  {
    $lookup:{
      from:"members",
      localField:"member_id",
      foreignField:"member_id",
      as:"member"
    }
  },
  {$unwind:"$member"},
  {
    $group:{
      _id:"$member.member_id",
      member_name:{$first:"$member.name"}}}])

// 10. Show each book along with how many times it has been borrowed.
db.borrowed.aggregate([
  {
    $group:{
      _id:"$book_id",
      borrow_count:{$sum:1}
    }
  },
  {
    $lookup:{
      from:"books",
      localField:"_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {
    $project:{
      book_title:"$book.title",
      borrow_count:1}}])


// Aggregation & Analysis
// 11. Count how many books each member has borrowed.
db.borrowed.aggregate([
  {
    $group:{
      _id:"$member_id",
      total_borrowed:{$sum:1}
    }
  },
  {
    $lookup:{
      from:"members",
      localField:"_id",
      foreignField:"member_id",
      as:"member"
    }
  },
  {$unwind:"$member"},
  {
    $project:{
      member_name:"$member.name",
      total_borrowed:1}}])

// 12. Which genre has the highest number of books?
db.books.aggregate([
  {
    $group:{
      _id:"$genre",
      total_books:{$sum:"$copies"}
    }
  },
  {$sort:{total_books:-1}},
  {$limit:1}])

// 13. List the top 2 most borrowed books.
db.borrowed.aggregate([
  {
    $group:{
      _id:"$book_id",
      borrow_count:{$sum:1}
    }
  },
  {
    $lookup:{
      from:"books",
      localField:"_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {
    $project:{
      book_title:"$book.title",
      borrow_count:1
    }
  },
  {$sort:{borrow_count:-1}},
  {$limit:2}])

// 14. Show the average number of copies available per genre.
db.books.aggregate([
  {$group:{_id:"$genre",avg_copies:{$avg:"$copies"}}}])

// 15. Find the total number of books currently borrowed (not returned).
db.borrowed.aggregate([
  {$match:{returned:false}},
  {$count:"total_not_returned"}])


// Advanced Scenarios
// 16. Add a new member who hasn't borrowed any book. Write a query to list such members.
// Add a new member
db.members.insertOne({member_id: 104,name: "Vikram Patel",joined_on: new Date("2024-07-20")})

// member who have not borrowed any book
db.members.aggregate([
  {
    $lookup:{
      from:"borrowed",
      localField:"member_id",
      foreignField:"member_id",
      as:"borrowed_books"
    }
  },
  {
    $match:{borrowed_books:{$eq:[]}}
  },
  {
    $project:{
      _id:0,
      member_name:"$name"}}])

// 17. Identify books that have never been borrowed.
db.books.aggregate([
  {
    $lookup:{
      from:"borrowed",
      localField:"book_id",
      foreignField:"book_id",
      as:"borrow"
    }
  },
  {
    $match:{borrow:{$eq:[]}}
  },
  {
    $project:{
      _id:0,
      book_title:"$title"}}])

// 18. Get the name of members who borrowed more than one book.
db.borrowed.aggregate([
  {
    $group:{
      _id:"$member_id",
      borrow_count:{$sum:1}
    }
  },
  {
    $match:{borrow_count:{$gt:1}}
  },
  {
    $lookup:{
      from:"members",
      localField:"_id",
      foreignField:"member_id",
      as:"member"
    }
  },
  {$unwind:"$member"},
  {
    $project:{
      member_name:"$member.name",
      borrow_count:1}}])

// 19. Display borrowing trends by month (group by date ).
db.borrowed.aggregate([
  {
    $group:{
      _id:{month:{$month:"$date"},year:{$year:"$date"}},
      total_borrowed:{$sum:1}
    }
  },
  {
    $sort:{"_id.year":1,"_id.month":1}}])

// 20. Show borrow records where the borrowed book had fewer than 5 copies at the time of borrowing.
db.borrowed.aggregate([
  {
    $lookup:{
      from:"books",
      localField:"book_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {
    $match:{"book.copies":{$lt:5}}
  },
  {
    $project:{
      borrow_id:1,
      member_id:1,
      book_title:"$book.title",
      book_copies:"$book.copies",
      date:1}}])


// Bonus Questions
// Simulate overdue books by adding a due_date and finding overdue records.
// upadting 
db.borrowed.updateOne({borrow_id:2},{$set:{due_date:new Date("2024-06-29")}})
db.borrowed.updateOne({borrow_id:3},{$set:{due_date:new Date("2024-07-04")}})

db.borrowed.find({returned:false,due_date:{$lt:new Date()}})

// Create a chart-style output showing how many books are borrowed per genre.
db.borrowed.aggregate([
  {
    $lookup:{
      from:"books",
      localField:"book_id",
      foreignField:"book_id",
      as:"book"
    }
  },
  {$unwind:"$book"},
  {
    $group:{
      _id:"$book.genre",
      total_borrowed:{$sum:1}
    }
  },
  {
    $project:{
      genre:"$_id",
      total_borrowed:1,
      _id:0
    }
  },
  {$sort:{total_borrowed:-1}}])