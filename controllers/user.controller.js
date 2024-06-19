let User = require('../Schemas/userSchema')
let { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_helper')

let addUser = async(req, res, next) => {
    console.log('adding user');
    try {
        let {username, email, password, role} = req.body
        let doesExist = await User.findOne({email:email})
        // console.log(doesExist);
        if(doesExist) return res.json({error:true, message:"This email is already registered"})

        let user = await User.create({username, email, password, role})
        // console.log(user.id);
        let accessToken = await signAccessToken(user.id)
        let refreshToken = await signRefreshToken(user.id)

        res.json({error:false, message:"User added successfully", accessToken, refreshToken})
    } catch (error) {
        next(error)
    }
}

let login = async(req, res, next) => {
    try {
        let {username, password} = req.body
        console.log(username);
        let user = await User.findOne({username:username})
        console.log(user);
        if(user){
            if(user.password == password){
                let accessToken = await signAccessToken(user.id)
                let refreshToken = await signRefreshToken(user.id)

                console.log(accessToken);
                res.json({error:false, message:"username and password is matching", userData:user, accessToken, refreshToken})
            }else{
                res.json({error:true, message:"username and password is not matching"})
            }
        }else{
            res.json({error:true, message:"This username is not registered"})
        }
    } catch (error) {
        next(error)
    }
}

let refresh_token = async(req, res, next) => {
    console.log('refresh_token');
    try {
        let {refreshToken} = req.body;
        // console.log(refreshToken);
        if(!refreshToken) throw createError.BadRequest()
        let userId = await verifyRefreshToken(refreshToken)

        let accesstoken = await signAccessToken(userId)
        let refToken = await signRefreshToken(userId)

        res.send({accesstoken : accesstoken, refreshToken : refToken})
    } catch (error) {
        next(error)
    }
}

let displayAdminUsers = async(req, res, next) => {
    try {
        let admins = await User.find({role:"Admin"})
        console.log(admins);
        res.send({error:false, message:"admins details fetched successfully", data:admins})
    } catch (error) {
        next(error)
    }
}

let displayInstructorUsers = async(req, res, next) => {
    try {
        let instructors = await User.find({role:"Instructor"})
        console.log(instructors);
        res.send({error:false, message:"instructorss details fetched successfully", data:instructors})
    } catch (error) {
        next(error)
    }
}

module.exports = { addUser, login, refresh_token, displayAdminUsers, displayInstructorUsers }