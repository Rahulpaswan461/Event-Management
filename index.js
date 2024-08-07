require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const userRoute = require("./routes/user")
const {connectMongoDB} = require("./connection")
const cookieParser = require("cookie-parser")
const { checkForAuthenticateUser } = require("./middleware/authJWT")
const eventRoute = require("./routes/event")
const sessionRoute = require("./routes/session") 
const path = require("node:path")

const app = express()
const PORT = process.env.PORT || 8000

// connect mongoDB
connectMongoDB(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/events-manage" )
.then(()=>console.log("MongoDB is connected !!"))
.catch(error=>console.log("There is some error while connecting !!"))
// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticateUser("token"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user
    }) 
})

app.use("/api/user",userRoute)
app.use("/api/event",eventRoute)
app.use("/api/session",sessionRoute)

app.listen(PORT,()=>{
    console.log("Server is running ar port 8000")
})