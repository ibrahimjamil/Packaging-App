const express = require("express")
const router =  express.Router()
const {signUp,signIn,tokenVerify} = require("../controllers/auth")
const credentialMiddleware = require("../middleware/credentialMiddleware")


router.post('/signUp',credentialMiddleware.signUpMiddleware,signUp)
router.post('/signIn',signIn)
router.get('/tokenVerify',tokenVerify)







module.exports = router