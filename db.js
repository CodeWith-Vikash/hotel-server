const mongoose=require('mongoose')
require('dotenv').config()

// defining mongodb connection url

// const mongoURL='mongodb://localhost:27017/hotel'
const mongoURL= process.env.DB_URL

// setup mongoDB connection

mongoose.connect(mongoURL,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})

// get the default connection
// Mongoose maintains a default connection object repersenting the MongoDB connection.
const db=mongoose.connection;

// eventlistners for database connection
db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',(err)=>{
    console.error('mongodb connection error:',err)
})
db.on('disconnected',()=>{
    console.error('mongodb disconnected')
})

// export database connection
module.exports=db