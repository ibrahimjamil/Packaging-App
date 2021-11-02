const multer = require('multer')
const client = require('../models/Client')
const path = require('path')
const fs = require('fs')
const User = require('../models/User')

exports.clientInfo = (req,res)=>{
    const storage = multer.diskStorage({
        destination: "./public/images/",
        filename: function(req, file, cb){
           cb(null,`${req.body.name}`+ path.extname(file.originalname));
        }
     });

    const upload = multer({
        storage: storage,
        limits:{
            fileSize: 1000000
        },
     }).single("myImage");

    upload(req, res, (err) => {
        const {name,vendorId} = req.body 
        if(!err){
            const clientObj = {
                name:name,
                image:req.body.name
            }
           client.create(clientObj)
                .then(async (data)=>{
                    await User.findByIdAndUpdate(
                        vendorId,
                        {
                            $push:{
                                client:data._id
                            }
                        }
                    )
                })
           }
        return res.sendStatus(200).end();
    })
}

exports.clientDataToShow = async (req,res) =>{
    const vendorId = req.body
    const data = await User.findById({_id:vendorId[0]}).populate('client')
    return res.send(data)
}