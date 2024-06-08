let session = require("express-session")
const crypto = require("crypto")

function Auth_session() {
    return session({
        secret: crypto.randomBytes(32).toString("hex"),
        resave: false,
        saveUninitialized: true
    })
}


function checkAuth(req, res, next){
    if (!req.session.username) {
        return res.status(404)
    }
    next()
}


module.exports = {
    Auth_session,
    checkAuth
}