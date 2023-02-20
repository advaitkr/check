const User = require('./../models/userModel');
const Activity = require('./../models/activity')
const solve = require('./../solve')
const { promisify } = require('util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res, next) => {

    const { name, email, password, role} = req.body

    const findUser = await User.findOne({ "email": email })
    if (!findUser) {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
            role:role
        })

        newUser.save(function (err, res) {
            if (err) { throw err; }
            console.log('test me', res)
        })
        res.json(newUser)
    }
    else {
        throw new Error("user Already Exists")
    }

}
exports.signin = async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ "message": "invalid credentials" })
        }
        console.log(process.env.SECRET_KEY)
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, process.env.SECRET_KEY,{expiresIn:'30h'});
        res.status(201).send({ user: existingUser, token: token, "msg": "signedIn" })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            "error": error
        })
    }
}
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)

    if (!token) {
        return next(new Error('You are not logged in!,Please log in to get access'))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
    console.log(decoded)
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
        return next(new Error('The token belong to the user doesn no exists'))
    }

   req.user = freshUser
    next()
}







exports.getAll = async (req, res, next) => {
    const allUser = await User.find()

    res.send({ "msg": allUser })
}
exports.restrictTo = (...role) => {
    
    return (req, res, next) => {
        console.log(req.user)
        if (!role.includes(req.user.role)) {
            return next(
                new Error('You do not have permission to perform the action', 403)
            )

        }

     next()

    }



}

exports.activity = (req,res,next)=>{

   let masterId = req.params.masterId
   let studentId = req.params.studentId
   let input = req.body.input
   let output = solve(input)
   console.log(output)
   const newActivity = new Activity({
    studentId:studentId,
    masterId:masterId,
    input:input,
    output:output
})

newActivity.save(function (err, res) {
    if (err) { throw err; }
    console.log('test me', res)
})
res.json(newActivity)

}

exports.activitylog = async(req,res,next)=>{
    
     let activitylog = await Activity.find()
    
     if(!activitylog){
        res.send({"msg":"No activity is created"})
     }
     try{
        res.send({"msg":activitylog })
     }
    catch(error){
        res.send({"msg":"Error"})
    }

}

exports.logout = async(req,res)=>{

  req.user.deleteToken(req.token,(err,user)=>{
     if(err) return res.status(400).send(err)
     res.status(200).send({"msg":"logout"})
  })

}