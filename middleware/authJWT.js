const { validateTokenForUser } = require("../service/authentication");

function checkForAuthenticateUser(cookie){
    return (req,res,next)=>{

        // skip the signup and the long routes
        if(req.path === "/api/user/signup" || req.path === "/api/user/login" || req.path=== "/"){
            return next();
        }
        const token = req.cookies[cookie]
        if(!token){
            return res.status(401).json({error:"Authentication is required"})
        }
        
        try{
           const payload = validateTokenForUser(token)
           req.user = payload
           return next()
        }
        catch(error){
            console.log("Authentication is requrired !!")

            return res.status(500).json({error:"Internal Server Error"})
        }

    }
}

module.exports = {
    checkForAuthenticateUser
}