const express = require('express');
const app = express()
const mongoose = require('mongoose')
//const dotenv = require('dotenv')
require('dotenv').config()
const dbConnect = require("./config/config")
const PORT = process.env.PORT || 5000
const {signup,signin,protect,getAll,activity,activitylog,restrictTo} = require("./controllers/userController")
dbConnect()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send({"msg":"Hello"})
})
app.post('/signup',signup)
app.post('/signin',signin)
app.get('/getall',protect,getAll)
app.post('/getresult/:studentId/:masterId',activity)
app.get('/activitylog',protect,restrictTo('student'),activitylog)



app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`)
  })