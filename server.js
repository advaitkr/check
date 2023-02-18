const express = require('express');
const app = express()
const mongoose = require('mongoose')
const serverless = require('serverless')
//const dotenv = require('dotenv')
require('dotenv').config()
const dbConnect = require("./config/config")
const PORT = process.env.PORT || 5000
const {signup,signin,protect,getAll,activity,activitylog,restrictTo} = require("./controllers/userController")
dbConnect()
app.use(express.json())
const router = express.Router()
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/getall',protect,getAll)
router.post('/getresult/:studentId/:masterId',activity)
router.get('/activitylog',protect,restrictTo('student'),activitylog)
app.use('/api',router)


app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`)
  })