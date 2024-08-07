const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
     name:{
        type:String,
        required: true,
     },
     date:{
        type:Date,
        default:Date.now,
     },
     location:{
        type:String,
        required:true,
     },
     description : {
        type:String,
        required: true,
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
     }
},{timestamps: true})

const Event = mongoose.model("events",eventSchema)

module.exports = Event