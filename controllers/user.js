const Session = require("../models/session");
const User = require("../models/user");
const { validateTokenForUser } = require("../service/authentication");

async function handleSignupUser(req,res){
    try{
       const {name, email, password} = req.body;
       if(!name || !email || !password){
         return res.status(400).json({msg:"Information incomplete !!!"})
       }
       let user = new User({
        name:name,
        email: email,
        password: password
       })

       user = await user.save()
       if(!user){
        return res.status(400).json({msg:"No user created !!"})
       }
       return res.redirect("/")
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

async function handleLoginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Ensure the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Call the static method to get the token
        const token = await User.matchPasswordAndGenerateToken(email, password);

        // Check if a token was returned
        if (!token) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
         const userDate = validateTokenForUser(token)
         let session = new Session({
            user: userDate.id,
            ipAddress : req.ip
         }) 
        req.user = userDate
       
         session = await session.save()
        // Set the token in a cookie and send a success response
        return res.status(200).cookie("token", token).render("home",{user:req.user})
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: error.message });
    }
}

async function logoutUser(req,res){
    const userId = req.user.id
    try{
        const session = await Session.findOne({user:userId}).sort({loginTime:-1})
        if(session){
            session.logoutTime = Date.now()
            await session.save()
        }

        return res.status(200).json({msg:"User logged out successfully !!!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Intenal Server Error"})
    }
}

module.exports = {
    handleSignupUser,
    handleLoginUser,
    logoutUser,
   
}