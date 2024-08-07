const express  = require("express")
const Session = require("../models/session")

const router = express.Router()

router.get("/",async (req,res)=>{
    try{
        const sessions = await Session.find({user:req.user.id})
        if(!sessions){
            return res.status(400).json({msg:"No session is for the user : "})
        }

        return res.status(200).json(sessions)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
})

module.exports = router