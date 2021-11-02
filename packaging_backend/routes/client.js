const express = require("express")
const router =  express.Router()
const {clientInfo,clientDataToShow} = require("../controllers/client")


router.post('/',clientDataToShow)
router.post('/upload',clientInfo)



module.exports = router