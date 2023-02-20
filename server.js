const express = require('express');
const app = express()
const mongoose = require('mongoose')
const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const cors = require('cors');
//const dotenv = require('dotenv')
require('dotenv').config()
const dbConnect = require("./config/config")
const PORT = process.env.PORT || 5000
const {signup,signin,protect,getAll,activity,activitylog,restrictTo,logout} = require("./controllers/userController")
dbConnect()
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router()
router.get("/",(req,res)=>{
    res.send({"msg":"hello"})
})
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/getall',protect,getAll)
router.post('/getresult/:studentId/:masterId',activity)
router.get('/activitylog',protect,restrictTo('student'),activitylog)
router.get('logout',protect,logout)
app.use('/api', router);

module.exports.handler = serverless(app);

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`)
  })