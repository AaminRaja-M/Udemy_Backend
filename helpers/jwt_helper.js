let JWT = require("jsonwebtoken")
let createError = require('http-errors')

let signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        let payload = {}
        let secret = process.env.ACCESS_TOKEN_SECRET
        let options = {
            expiresIn : "1h",
            issuer: "udemy.com",
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err){
                console.log(err.message);
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

let verifyAccessToken = (req, res, next) => {
    console.log('verifyAccessToken');
    if(!req.headers['authorization']){
        // return next(createError.Unauthorized())
        res.json({error:true, message:"no headers authorization"})
        next()
    }
    let token = req.headers["authorization"]

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err){
            let message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            console.log(message);
            // return next(createError.Unauthorized(message))
            res.json({error:true, message:"error"})
        }
        req.payload = payload
        next()
    })
    
}

let signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        let payload = {}
        let secret = process.env.REFRESH_TOKEN_SECRET
        let options = {
            expiresIn : "1y",
            issuer: "udemy.com",
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err){
                console.log(err.message);
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

let verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err){
                return reject(createError.Unauthorized())
            }
            let userId = payload.aud

            resolve(userId)
        })
    })
}

module.exports = {signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken}