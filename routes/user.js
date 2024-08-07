const express = require("express")
const {handleSignupUser,handleLoginUser,logoutUser} = require("../controllers/user")

const router = express.Router()

router.post("/signup",handleSignupUser)
router.post("/login",handleLoginUser)
router.post("/logout",logoutUser)
router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/login",(req,res)=>{
    return res.render("signin")
})
module.exports = router