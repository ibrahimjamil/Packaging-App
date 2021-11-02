const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNo:{
        type:String,
        required:true,
    },
    client:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Client'
        }
    ]
})

module.exports = mongoose.model("User",UserSchema)
