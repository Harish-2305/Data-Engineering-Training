use bookstoreDB

// books
db.books.insertMany([{ book_id: 101, title: "The AI Revolution", author: "Ray Kurzweil", genre: "Technology", price: 799, stock: 20 },{ book_id: 102, title: "Hidden Figures", author: "Margot Lee", genre: "Biography", price: 499, stock: 15 },{ book_id: 103, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 299, stock: 30 },{ book_id: 104, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", price: 999, stock: 10 },{ book_id: 105, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", price: 699, stock: 25 }]);

// customers
db.customers.insertMany([{ customer_id: 1, name: "Anjali Rao", email: "anjali@example.com", city: "Hyderabad" },{ customer_id: 2, name: "Ravi Kumar", email: "ravi@example.com", city: "Delhi" },{ customer_id: 3, name: "Fatima Shaikh", email: "fatima@example.com", city: "Hyderabad" },{ customer_id: 4, name: "Vikram Das", email: "vikram@example.com", city: "Mumbai" },{ customer_id: 5, name: "Neha Kapoor", email: "neha@example.com", city: "Pune" }]);

// orders
db.orders.insertMany([{ order_id: 201, customer_id: 1, book_id: 101, order_date: new Date("2023-02-10"), quantity: 2 },{ order_id: 202, customer_id: 2, book_id: 104, order_date: new Date("2023-05-01"), quantity: 1 },{ order_id: 203, customer_id: 3, book_id: 105, order_date: new Date("2023-03-12"), quantity: 3 },{ order_id: 204, customer_id: 1, book_id: 102, order_date: new Date("2022-12-25"), quantity: 1 },{ order_id: 205, customer_id: 4, book_id: 103, order_date: new Date("2023-06-15"), quantity: 2 },{ order_id: 206, customer_id: 5, book_id: 103, order_date: new Date("2023-07-01"), quantity: 1 },{ order_id: 207, customer_id: 1, book_id: 105, order_date: new Date("2023-08-20"), quantity: 1 }]);

// 1. List all books priced above 500
db.books.find({price:{$gt:500}})

// 2. Show all customers from ‘Hyderabad’
db.customers.find({city:{$eq:'Hyderabad'}})

// 3. Find all orders placed after January 1, 2023
db.orders.find({order_date:{$gt:new Date("2023-01-01")}})

//
db.orders.aggregate([
  {
    $lookup:{
      from:"customers",
      localField:"customer_id",
      foreignField:"customer_id",
      as:"customer"
    }
  },
  {$unwind:"$customer"},
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
    $project:{
      _id:1,
      order_id:1,
      customer_name:"$customer.name",
      book_title:"$book.title",
      quantity:1,
      order_date:1
    }
  }
]);

//5. Show total quantity ordered for each book
db.orders.aggregate([
  {
    $group:{
      _id:"$book_id",
      total_quantity:{$sum:"$quantity"}
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
      total_quantity:1
    }
  }
]);

// 6. Show total number of orders placed by each customer
db.orders.aggregate([
  {
    $group:{
      _id:"$customer_id",
      total_orders:{$sum:1}
    }
  },
  {
    $lookup:{
      from:"customers",
      localField:"_id",
      foreignField:"customer_id",
      as:"customer"
    }
  },
  {$unwind:"$customer"},
  {
    $project:{
      customer_name:"$customer.name",
      total_orders:1
    }
  }
]);

// 7. Calculate total revenue generated per book
db.orders.aggregate([
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
      _id:"$book_id",
      title:{$first:"$book.title"},
      revenue:{$sum:{$multiply:["$quantity","$book.price"]}}
    }
  }
]);

// 8. Find the book with the highest total revenue
db.orders.aggregate([
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
      _id:"$book_id",
      title:{$first:"$book.title"},
      revenue:{$sum:{$multiply:["$quantity","$book.price"]}}
    }
  },
  {$sort:{revenue:-1}},
  {$limit:1}
]);

// 9. List genres and total books sold in each genre
db.orders.aggregate([
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
      total_sold:{$sum:"$quantity"}
    }
  }
]);


// 10. Show customers who ordered more than 2 different books
db.orders.aggregate([
  {
    $group:{
      _id:{customer_id:"$customer_id",book_id:"$book_id"}
    }
  },
  {
    $group:{
      _id:"$_id.customer_id",
      different_books:{$sum:1}
    }
  },
  {$match:{different_books:{$gt:2}}},
  {
    $lookup:{
      from:"customers",
      localField:"_id",
      foreignField:"customer_id",
      as:"customer"
    }
  },
  {$unwind:"$customer"},
  {
    $project:{
      customer_name:"$customer.name",
      different_books:1
    }
  }
]);
