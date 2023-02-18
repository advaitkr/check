const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
name:{
type:String,
required:[true,'Please tell us your name']
},
email:{
type:String,
required:[true,'Please provide your email'],
unique:true,
lowercase:true,
validate:[validator.isEmail,'Please provide a valid email']
},
password:{
type:String,
required:[true,'Please provide a password'],
minlength:8
},
role:{
type:String,
enum:['master','student'],
},


})

// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')) return next()
//     this.password = await bcrypt.hash(this.password)
//     this.passwordConfirm = undefined;
//     next()
// })
const User = mongoose.model('User',userSchema)

module.exports = User;
