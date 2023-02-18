require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const auth =(req,res,next)=>{

    const token = req.headers['x-access-token']

    if(!token){
        return res.status(401).json({msg:'No token access denied'})
    }
    try {

        const decoded =jwt.verify(token,  process.env.SECRET);

        next()
    } catch (err) {
        res.status(401).json({msg:'Invalid Token'})
    }
}

module.exports = auth
