const mongoose  = require("mongoose")

const sessionSchema = new mongoose.Schema({
     user:{
       type:mongoose.Schema.Types.ObjectId,
       ref: 'user',
       required: true,
     },
     ipAddress: {
       type:String,
       required:true,
     },
     loginTime : {
       type:Date,
       default: Date.now,
       required:true,
     },
     logoutTime : {
       type:Date,
     }

},{timestamps:true})

const Session = mongoose.model("session",sessionSchema)

module.exports = Session