const {default:mongoose} = require("mongoose");
mongoose.set('strictQuery', true)
const dbConnect = ()=>{
    mongoose.connect("mongodb://localhost:27017/projectdb",{
        useNewUrlParser:true,
        useUnifiedTopology:true
      },(err)=>{
          if(err){
             console.log(err)
          }
          else{
            console.log("db connected")
          }
    })
}

module.exports = dbConnect