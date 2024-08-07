const JWT = require("jsonwebtoken")
const secret = "rahul@123"

function createTokenForAuthenticateUser(user){
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email
    }
    return JWT.sign(payload,secret,{expiresIn:'2h'})
}

function validateTokenForUser(token){
    const payload =  JWT.verify(token,secret)
    return payload
}

module.exports = {
    createTokenForAuthenticateUser,
    validateTokenForUser
}