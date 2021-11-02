const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.signUp = async(req,res)=>{
    const {
        username,
        password,
        email,
        phoneNo
    } = req.body 

    
    const user = await User.create({
        userName: username,
        password:password,
        email:email,
        phoneNo:phoneNo
    })
    res.send(user)
}

exports.signIn = async(req,res)=>{
    const {
        username,
        password
    } = req.body 
    
    const storedPassword = await User.findOne({
        "userName": username,
    })
    const result = await bcrypt.compare(password,storedPassword.password)
    const token = result && await jwt.sign(storedPassword.password,process.env.ACCESS_TOKEN_SECRET)
    res.json(
        {
            id:storedPassword._id,
            token:token
        }
    )
}

exports.tokenVerify = async(req,res)=>{
    const bearer = req.headers['authorization']
    const token = await jwt.verify(bearer.split(' ')[1],process.env.ACCESS_TOKEN_SECRET)
    res.send(token)
}