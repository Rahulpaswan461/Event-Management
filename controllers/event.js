const { default: mongoose } = require("mongoose")
const Event = require("../models/events")
const axios = require("axios")

async function createEvent(req,res){
    try{
        const {name,location,description} = req.body

        let event = new Event({
            name:name,
            location : location,
            description: description,
            user: req.user.id
        })
        event = await event.save()

       return res.render("home",{
        user:req.user
       })
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error !!"})
    }
}

async function getEventsForAuthenticatedUser(req,res){
    try{
        const events = await Event.find({user:req.user.id}).populate("user").select("name email")

        if(!events){
            return res.status(404).json({msg:"No events are available for the user : "});
        }

        return res.render("allEvents",{
            user: req.user,
            events: events
        })
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

async function updateSpecificEvent(req,res){
     try{
         if(!mongoose.isValidObjectId(req.params.eventId)){
            return res.status(400).json({msg:"Invalid event id : "})
         }

         const event = await Event.findByIdAndUpdate(req.params.eventId,{
            name: req.body.name,
            location : req.body.location,
            description : req.body.description
         },{new:true})

         if(!event){
            return res.status(400).json({msg:"No event is present with the associated id !!"})
         }

         return res.render("home",{
            user: req.user
         })
     }
     catch(error){
        console.log("There is some error",error)
        return res.status(200).json({msg:"Internal Server Error"})
     }
}

async function deleteEventInformation(req,res){
    try{
         if(!mongoose.isValidObjectId(req.params.eventId)){
            return res.status(400).json({msg:"Invalid event id : "})
         }

         const event = await Event.findByIdAndDelete(req.params.eventId)
         if(!event){
            return res.status(400).json({msg:"No event is present with the associated id !!"})
         }

        return res.render("home",{
            user:req.user
        })
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Errir"})
    }
}


async function checkForWeatherCondition(req,res){
    try{
        const location = req.params.location
        const api = await axios.get(`http://api.weatherapi.com/v1/current.json?key=569101998e1744be856142304240608&q=${location}&aqi=no`)
        const weather = api.data.current.condition.text
        return res.render("detail",{
            user:req.user,
            weather:weather
        })
    }
    catch(error){
       console.log("There is some error",error)
       return res.status(500).json({msg:"Internal Server Error"})
    }
}

async function getSpecificEvents(req,res){
    try{
        if(!mongoose.isValidObjectId(req.params.eventId)){
            return res.status(400).json({msg:"Invalid event id !!"})
        }
        const event = await Event.findById(req.params.eventId)
        if(!event){
             return res.status(400).json({msg:"No event is present for the corressponding id : "});
        }

        return res.render("detail",{
            user:req.user,
            event:event
        })
    }
    catch(error){
        console.log("There is some error")
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

module.exports = {
    createEvent,
    getEventsForAuthenticatedUser,
    updateSpecificEvent,
    deleteEventInformation,
    checkForWeatherCondition,
    getSpecificEvents
}