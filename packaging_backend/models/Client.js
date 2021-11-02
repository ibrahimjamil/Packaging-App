const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("Client",ClientSchema)
