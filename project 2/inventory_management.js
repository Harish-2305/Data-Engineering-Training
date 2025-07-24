// inventory logs database for store audit logs or stock adjustment reasons 
use inventory_logs

// Create audit_logs Collection
db.audit_logs.insertMany([{log_id: 1,product_id: 1,warehouse_id: 1000,movement_type: "IN",quantity: 30,reason: "New stock purchase",adjusted_by: "Admin",verified: true,adjustment_date: new Date(),notes: "Initial stock added from supplier delivery" },{log_id: 2,product_id: 2,warehouse_id: 1000,movement_type: "OUT",quantity: 5,reason: "Customer order",adjusted_by: "InventoryUser",verified: true,adjustment_date: new Date(),notes: "Dispatched from warehouse"  }])

//  Add indexes for quick search by product ID or warehouse

db.audit_logs.createIndex({ product_id: 1 })
db.audit_logs.createIndex({ warehouse_id: 1 })

// viewing the data
db.audit_logs.find({ product_id: 1 })
db.audit_logs.find({ warehouse_id: 1000 })


