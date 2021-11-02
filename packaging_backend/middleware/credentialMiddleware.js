const bcrypt = require("bcryptjs")

const signUpMiddleware = async(req,res,next)=>{
    try{
        const salts = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salts)
        next()
    }catch(err){
        res.status(400).send("error in generating hash password")
    }
}
module.exports =  {
    signUpMiddleware,
}
