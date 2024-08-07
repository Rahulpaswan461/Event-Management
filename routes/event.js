const express = require("express")
const {createEvent,getEventsForAuthenticatedUser,
    updateSpecificEvent,deleteEventInformation,checkForWeatherCondition,getSpecificEvents} = require("../controllers/event")

const router = express.Router()

router.post("/",createEvent)
router.get("/get/all",getEventsForAuthenticatedUser)
router.post("/update/:eventId",updateSpecificEvent)
router.get("/delete/:eventId",deleteEventInformation)
router.get("/weather/condition/:location",checkForWeatherCondition)
router.get("/:eventId",getSpecificEvents)

router.get("/",(req,res)=>{
    return res.render("createEvent")
})
router.get("/update/:eventId",(req,res)=>{
    return res.render("updateEvent",{eventId:req.params.eventId})
})

module.exports = router