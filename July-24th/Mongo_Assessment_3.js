// MongoDB Assignment: Design & Query Challenge
use job_portal

// Suggested Collections (you can rename or adjust):
// 1. jobs – job title, company, location, salary, job_type (remote/hybrid/on-site),posted_on
db.jobs.insertMany([{job_id: 1,job_title: "Backend Developer",company: "TechNova",location: "Bangalore",salary: 1200000,job_type: "remote",posted_on: ISODate("2025-07-14")},{ job_id: 2,job_title: "Frontend Developer",company: "InnoSoft",location: "Hyderabad",salary: 950000, job_type: "on-site", posted_on: ISODate("2025-07-04")},{ job_id: 3,job_title: "Full Stack Engineer",company: "TechNova",location: "Mumbai",salary: 1350000,job_type: "hybrid", posted_on: ISODate("2025-07-19")},{job_id: 4,job_title: "Data Analyst",company: "DataEdge",location: "Chennai",salary: 1100000,job_type: "remote",posted_on: ISODate("2025-06-14")},{job_id: 5, job_title: "Cloud Engineer",company: "Cloudify",location: "Pune",salary: 1450000,job_type: "remote",posted_on: ISODate("2025-06-29")}])

// 2. applicants – name, skills, experience, city, applied_on
db.applicants.insertMany([{applicant_id: 101,name: "Aarav Mehta",skills: ["Python", "MongoDB", "Node.js"],experience: 3,city: "Bangalore",applied_on: ISODate("2025-07-17")},{ applicant_id: 102,name: "Sana Iyer",skills: ["React", "JavaScript"],experience: 2, city: "Hyderabad", applied_on: ISODate("2025-07-14")},{applicant_id: 103,name: "Rohan Kapoor",skills: ["MongoDB", "Express", "Java"],experience: 4,city: "Delhi",applied_on: ISODate("2025-07-21")},{applicant_id: 104,name: "Meera Reddy",skills: ["SQL", "Excel", "Python"],experience: 2,city: "Hyderabad",applied_on: ISODate("2025-07-09")},{applicant_id: 105,name: "Neel Sharma",skills: ["AWS", "Terraform", "Docker"],experience: 5,city: "Chennai",applied_on: ISODate("2025-07-12")}])

// 3. applications – applicant_id, job_id, application_status, interview_scheduled,feedback
db.applications.insertMany([{application_id: 1001,applicant_id: 101,job_id: 1,application_status: "interview scheduled",interview_scheduled: true,feedback: "Strong in backend tech"},{ application_id: 1002, applicant_id: 102,job_id: 2,application_status: "submitted",interview_scheduled: false, feedback: "Needs frontend improvement"},{application_id: 1003,applicant_id: 103,job_id: 1,application_status: "interview scheduled",interview_scheduled: true,feedback: "Good MongoDB knowledge"},{application_id: 1004, applicant_id: 103,job_id: 3,application_status: "submitted",interview_scheduled: false,feedback: "Full stack profile"},{application_id: 1005,applicant_id: 105,job_id: 5, application_status: "submitted",interview_scheduled: false, feedback: "Excellent cloud experience"  }])


// Part 2: Write the Following Queries
// 1. Find all remote jobs with a salary greater than 10,00,000.
db.jobs.find({job_type:"remote",salary:{$gt:1000000}})

// 2. Get all applicants who know MongoDB.
db.applicants.find({skills:"MongoDB"})

// 3. Show the number of jobs posted in the last 30 days.
db.jobs.countDocuments({posted_on:{$gte:new Date(new Date()-30*24*60*60*1000)}})

// 4. List all job applications that are in ‘interview scheduled’ status.
db.applications.find({application_status:"interview scheduled"})

// 5. Find companies that have posted more than 2 jobs.
db.jobs.aggregate([
  {$group:{_id:"$company",total:{$sum:1}}},
  {$match:{total:{$gt:2}}}])


// Part 3: Use $lookup and Aggregation
// 6. Join applications with jobs to show job title along with the applicant’s name.
db.applications.aggregate([
  {
    $lookup:{
      from:"jobs",
      localField:"job_id",
      foreignField:"job_id",
      as:"job"
    }
  },
  {$unwind:"$job"},
  {
    $lookup:{
      from:"applicants",
      localField:"applicant_id",
      foreignField:"applicant_id",
      as:"applicant"
    }
  },
  {$unwind:"$applicant"},
  {
    $project:{
      _id:0,
      job_title:"$job.job_title",
      applicant_name:"$applicant.name"}}])

// 7. Find how many applications each job has received.
db.applications.aggregate([
  {
    $group:{
      _id:"$job_id",
      total_applications:{$sum:1}}}])

// 8. List applicants who have applied for more than one job.
db.applications.aggregate([
  {
    $group:{
      _id:"$applicant_id",
      application_count:{$sum:1}}},
  {$match:{application_count:{$gt:1}}},
  {
    $lookup:{
      from:"applicants",
      localField:"_id",
      foreignField:"applicant_id",
      as:"applicant"
    }
  },
  {$unwind:"$applicant"},
  {
    $project:{
      _id:0,
      applicant_name:"$applicant.name",
      application_count:1}}])

// 9. Show the top 3 cities with the most applicants.
db.applicants.aggregate([
  {
    $group:{
      _id:"$city",
      total:{$sum:1}
    }
  },
  {$sort:{total:-1}},
  {$limit:3}])

// 10. Get the average salary for each job type (remote, hybrid, on-site).
db.jobs.aggregate([
  {
    $group:{
      _id:"$job_type",
      average_salary:{$avg:"$salary"}}}])


// Part 4: Data Updates
// 11. Update the status of one application to "offer made".
db.applications.updateOne({application_id:1002},{$set:{application_status:"offer made"}})

// 12. Delete a job that has not received any applications.
db.jobs.deleteMany({job_id:{$nin: db.applications.distinct("job_id")}})

// 13. Add a new field shortlisted to all applications and set it to false.
db.applications.updateMany({},{$set:{shortlisted:false}})

// 14. Increment experience of all applicants from "Hyderabad" by 1 year.
db.applicants.updateMany({city:"Hyderabad"},{$inc:{experience:1}})

// 15. Remove all applicants who haven’t applied to any job.
db.applicants.deleteMany({applicant_id:{$nin:db.applications.distinct("applicant_id")}})
