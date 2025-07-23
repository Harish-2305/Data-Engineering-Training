use online_course;

// Use MongoDB to store optional feedback or reviews (JSON)
db.feedbacks.insertMany([{student_id:1, course_id:501, feedback:"The Python Foundation course was well-structured.",rating:5,date:new Date("2025-07-20") }, {student_id :2,course_id:501,feedback:"Clear explanations, but a bit fast-paced.",rating:4,date:new Date("2025-07-21")},{student_id:1,course_id:502,feedback:"Advanced topics were challenging but useful.",rating:4.5,date:new Date("2025-07-22")}]);

// Index to quickly find feedback by student
db.feedbacks.createIndex({ student_id: 1 });

// Index to quickly find feedback by course
db.feedbacks.createIndex({ course_id: 1 });

